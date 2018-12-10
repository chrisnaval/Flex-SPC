// All Users related and User Profile Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { UserProfile } from '../userProfile.js';

Meteor.publish('user.getById', function(userId) {
  // validation for userId
  new SimpleSchema({
    userId: { 
      type: String 
    },
  }).validate({ userId});

  return UserProfile.find({}, {
    fields: { secretInfo: 0 }
  });
});

Meteor.publish('users.all', function() {
  return Meteor.users.find({_id: this.userId},
    {fields: {'profile': 1}});
});