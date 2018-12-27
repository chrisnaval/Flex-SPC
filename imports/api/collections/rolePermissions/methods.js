// Methods related to RolePermissions Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { RolePermissions } from './rolePermissions.js';
import { AppModules } from '/imports/api/collections/appModules/server/publications.js';
import { Permissions } from '/imports/api/collections/permissions/permissions.js';
import { Roles } from '/imports/api/collections/roles/roles.js';

// Constants
import { moduleFunctions } from '/lib/constants.js';

Meteor.methods({
	'rolePermissions.insert': function() {
		// Validation of Data from the Client using the Collection's Schema
		// AppModules.schema.validate(appModuleData);
		// Permissions.schema.validate(permissionsData);
		// RolePermissions.schema.validate(rolePermissionData);
		// Roles.schema.validate(roleData);

		try {
			Roles.insert({
				role: "user",
				description: " can destroy your system "
			}, function(error, roleId) {
				if(error) {
					throw new Meteor.error('error', error.reason);
				} else {
					var permissions = []; // Array for the created Permissions

					for(var moduleFunction in moduleFunctions) {
						var permissionId = Permissions.insert({
							module: "element.module",
							function: moduleFunctions[moduleFunction],
							permission: "element.type" + '-' + "element.module "+ '.' + moduleFunctions[moduleFunction]
						});
						permissions.push(Permissions.findOne(permissionId));
					};
					console.log(permissions, permissionId);
				}
			});

		var eat = "food";
		console.log(eat);

		} catch(error) {
			throw new Meteor.error('error', error.reason);
		}
  	},
});