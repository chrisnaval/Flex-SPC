// All Users related and User Profile Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

Meteor.publish('users.all', function() {
  return Meteor.users.find({});
});
