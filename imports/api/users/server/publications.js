// All Users-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { Users } from '../users.js';

Meteor.publish('users.all', function() {
  return Users.find({});
});