// Methods related to RolePermissions Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { RolePermissions } from './rolePermissions.js';
import { Permissions } from '/imports/api/collections/permissions/permissions.js';
import { Roles } from '/imports/api/collections/roles/roles.js';

Meteor.methods({
	'rolePermissions.accessAll': function(roleData, permissionData) {
		// Validation of Data from the Client using the Collection's Schema
		Permissions.schema.validate(permissionData);
		Roles.schema.validate(roleData);

		try {
			Roles.insert({
				role: roleData.role,
				description: roleData.description
			}, function(error, roleId) {
				if(error) {
					throw new Meteor.error('error', error.reason);
				} else {
					var permissions = []; // Array for the created Permissions

					// for(var moduleFunction in moduleFunctions) {
					permissionData.forEach(function(moduleName, functionName, permission) {
						var getPermission = Permissions.insert({
							moduleName: moduleName,
							functionName: functionName,
							permission: permission
						});
						console.log(getPermission);
					});
						permissions.push(Permissions.findOne(permissionId));
				}
			});
		} catch(error) {
			throw new Meteor.error('error', error.reason);
		}
	},
	'rolePermissions.insert': function() {

		try {
			
		} catch(error) {

		}
	},
});