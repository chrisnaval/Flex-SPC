// All RolePermissions Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { rolePermissions } from '../rolePermissions.js';

Meteor.publish('rolePermissions.all', function() {
  return rolePermissions.find({});
});