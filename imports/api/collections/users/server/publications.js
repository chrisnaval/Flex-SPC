// All Users-related Publications

// Package(s)
import { Meteor } from 'meteor/meteor';

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