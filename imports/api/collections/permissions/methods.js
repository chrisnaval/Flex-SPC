// Methods related to Permissions Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Mongo Collection(s)
import { Permissions } from './permissions.js';

Meteor.methods({
  'permission.insert': function(permissionData) {
    // Validation of Data from the Client using the Collection's Schema
	Permissions.schema.validate(permissionData);

    try {
		Permissions.insert({
			module: permissionData.module,
			function: permissionData.function,
			permission: permissionData.permission
		});
    } catch(error) {
      	throw new Meteor.error('error', error.reason);
    }
  },
});