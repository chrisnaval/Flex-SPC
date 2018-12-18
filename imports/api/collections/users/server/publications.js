// All Users-related Publications

// Package(s)
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// Import(s)
import { UserProfiles } from '../userProfiles.js';

Meteor.publish('users.all', function() {
	return Meteor.users.find({}, {
		fileds: {
			profile: 1,
		}
	});
});

Meteor.publish('usersProfile.all', function(userID) {
	check(userID, String);

	const getProfilById = Meteor.users.findOne(userID);

	if(getProfilById && (!getProfilById.userId || getProfilById.userId === this.userId)) {
		return [
			Meteor.users.find(listId),
			UserProfiles.find({listId})
		];
	} else {
		return this.ready();
	}

	// return UserProfiles.find({});
});