// All Permissions-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { Permissions } from '../permissions.js';

//get all the data in permissions collection
Meteor.publish('permissions.all', function() {
  return Permissions.find({});
});