// Methods related to RolePermissions Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';

// Collection(s)
import { RolePermissions } from './rolePermissions.js';
import { Permissions } from '/imports/api/collections/permissions/permissions.js';
import { Roles } from '/imports/api/collections/roles/roles.js';

Meteor.methods({
	'rolePermissions.insert': function(role, permissions) {
		// Validation of Data from the Client using the Collection's Schema
		Roles.schema.validate(role);
		// Permissions.schema.validate(permissions);
		// check(permissions, {
        //     module: String,
        //     functionName: String,
        //     permission: String,
		// });
		
		try {
			const roles = Roles.findOne({role: role.role});

			if(roles == undefined) {
				Roles.insert({
					role: role.role,
					description: role.description
				}, function(error, roleId) {
					if(error) {
						throw new Meteor.error('error', error.reason);
					} else {
						
						var permissionDatas = []; // Array for the created Permissions
	
						permissions.forEach(element => {
							var permissionId = Permissions.insert({
								name: element.name,
								module: element.module,
								functionName: element.functionName,
								permission: element.permission
							});
							permissionDatas.push(Permissions.findOne(permissionId));
						});
						var role = Roles.findOne(roleId);
						RolePermissions.insert({
							role,
							permissionDatas
						});
					}
				});
			} else {
				throw new Meteor.Error('error', error.reason);
			}	
		} catch(error) {
			throw new Meteor.Error("Role-name", "Role is already exist !");
		}
	},
	'rolePermissions.remove': function(rolePermissionId) {

		try {
			var rolePermission = RolePermissions.findOne({ _id: rolePermissionId});
			var roleId = rolePermission.role._id;

			// check if the role has been used by atleast one user
			var user = Meteor.users.findOne({'profile.role._id': roleId});
			var permissions = rolePermission.permissionDatas;

			if(user == null) {
				RolePermissions.remove({
					_id: rolePermissionId
				}, function(error, response) {
					if(error) {
						throw new Meteor.error('error', error.reason);
					} else {
						Roles.remove({ _id: roleId });
						permissions.forEach(element => {
							Permissions.remove(element);
						});
					}
				});
			} else {
				throw new Meteor.error("Remove-role", "Cant remove role, some user using this !");
			}	
		} catch(error) {
			throw new Meteor.error('error', error.reason);
		}
	},
});