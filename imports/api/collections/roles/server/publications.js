// All Roles-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { Roles } from '../roles.js';

Meteor.publish('roles.all', function() {
  return Roles.find({});
});