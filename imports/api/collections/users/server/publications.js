// All Users-related Publications

// Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { UserProfiles } from '../userProfiles.js';

Meteor.publish('users.all', function() {
    return Meteor.users.find({}, {
		fields: {
			username: 1,
			emails: 1,
			profile: 1,
			createdAt: 1
		}
	});
});

Meteor.publish('usersProfile.all', function() {
    return UserProfiles.find({}, {
		fields: {
			firstName: 1,
			lastName: 1,
			address: 1,
			contactNo: 1
		}
	});
});