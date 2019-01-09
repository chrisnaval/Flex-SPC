// Methods related to Roles Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection
import { Roles } from './roles.js';

Meteor.methods({
	'role.insert': function(roleData) {
		// Validation of Data from the Client using the Collection's Schema
		Roles.schema.validate(roleData);

		try {
			Roles.insert({
				role: roleData.role,
				description: roleData.description,
				type: roleData.type
			});
		} catch(error) {
			throw new Meteor.error('error', error.reason);
		}
	},
});