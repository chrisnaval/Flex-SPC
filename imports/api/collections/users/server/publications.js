// All Users-related Publications

// Package(s)
import { Meteor } from 'meteor/meteor';

Meteor.publish('users.all', function() {
    return Meteor.users.find({}, {
		fields: {
			profile: 1,
		}
	});
});