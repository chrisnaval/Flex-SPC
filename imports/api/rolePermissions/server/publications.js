// All App Role-Permissions

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { rolePermissions } from '../rolePermissions.js';

Meteor.publish('rolePermissions.all', function() {
  return rolePermissions.find({});
});