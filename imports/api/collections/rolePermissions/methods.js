// Methods related to RolePermissions Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';

// Collection(s)
import { RolePermissions } from './rolePermissions.js';
import { Permissions } from '/imports/api/collections/permissions/permissions.js';
import { Roles } from '/imports/api/collections/roles/roles.js';

Meteor.methods({
	'rolePermissions.insert': function(roleData, permissionsData) {
		// Validation of Data from the Client using the Collection's Schema
		Roles.schema.validate(roleData);
		// Permissions.schema.validate(permissionsData);
		// check(permissions, {
        //     module: String,
        //     functionName: String,
        //     permission: String,
		// });
		try {
			var roles = Roles.findOne({ role: roleData.role });

			if(roles === undefined) {
				Roles.insert({
					role: roleData.role,
					description: roleData.description,
					type: roleData.type
				}, function(error, roleId) {
					if(error) {
						throw new Meteor.Error('error', error.reason);
					} else {
						
						var permissions = []; // Array for the created Permissions

						permissionsData.forEach(element => {
							var getPermissions = element.permission;

							var permission = Permissions.findOne({permission: getPermissions});

							if(permission == null) {
								Permissions.insert({
									module: element.module,
									functionName: element.functionName,
									permission: element.permission
								});
							}
							permissions.push(Permissions.findOne({permission: getPermissions}));
						});
						RolePermissions.insert({
							role: Roles.findOne({ _id: roleId }),
							permissions
						});
					}
				});
			} else {
				throw new Meteor.Error('Role-name', 'Role already exist!');
			}
		} catch(error) {
			throw new Meteor.Error('error', error.reason);
		}
	},
	'rolePermissions.update': function(rolePermissionId, rolePermissionData) {
		// Validation of Data from the Client using the Collection's Schema
		Roles.schema.validate(rolePermissionData.roleData);
		
		try {
			var rolePermission = RolePermissions.findOne({ _id: rolePermissionId});
			var roleId = rolePermission.role._id;
			var permissions = rolePermission.permissions;

			Roles.update({_id: roleId}, {
				$set: {
					role: rolePermissionData.roleData.role,
					description: rolePermissionData.roleData.description,
					type: rolePermissionData.roleData.type,
				}
			});
			// Delete all the Permissions before it will be replaced by the new one
			permissions.forEach(element => {
				Permissions.remove({_id: element._id});
			});

			var permissions = []; // Array for the created Permissions

			rolePermissionData.permissionsData.forEach(element => {
				var permissionId = Permissions.insert({
					module: element.module,
					functionName: element.functionName,
					permission: element.permission
				});
				 
				permissions.push(Permissions.findOne(permissionId));
			});

			RolePermissions.update({ _id: rolePermissionId }, {
				$set: {
					role: Roles.findOne({ _id: roleId}),
					permissions: permissions,
				}
			});

		} catch(error) {
			throw new Meteor.Error('error', error.reason);
		}
	},
	'rolePermissions.remove': function(rolePermissionId) {

		try {
			var rolePermission = RolePermissions.findOne({ _id: rolePermissionId});
			var roleId = rolePermission.role._id;

			// check if the role has been used by atleast one user
			var user = Meteor.users.findOne({'profile.role._id': roleId});
			var permissions = rolePermission.permissions;

			if(user && user.deletedAt == null) {
				throw new Meteor.Error('remove-error', 'Cannot remove this role since currently used by users!');
			} else {
				RolePermissions.remove({
					_id: rolePermissionId
				}, function(error) {
					if(error) {
						throw new Meteor.Error('error', error.reason);
					} else {
						Roles.remove({ _id: roleId });
						permissions.forEach(element => {
							Permissions.remove(element);
						});
					}
				});
			}
		} catch(error) {
			throw new Meteor.Error('error', error.reason);
		}
	},
});