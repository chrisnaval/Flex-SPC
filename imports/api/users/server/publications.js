// All Users-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { userDetails } from '../userDetails.js';

Meteor.publish('users.all', function() {
  return userDetails.find({});
});