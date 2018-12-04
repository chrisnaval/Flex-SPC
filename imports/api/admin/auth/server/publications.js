// All Users-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { UserDetails } from '../userDetails.js';

Meteor.publish('usersById', function(userId, userName) {
  new SimpleSchema({
    userId: { type: String },
    userName: { type: String }
  }).validate({ userId, userName });
  return UserDetails.find({}, {
    fields: { secretInfo: 0 }
  });
});

Meteor.publish('users.all', function() {
  return Meteor.users.find({_id: this.userId},
    {fields: {'profile': 1}});
});