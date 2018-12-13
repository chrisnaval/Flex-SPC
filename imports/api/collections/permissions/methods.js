// Methods related to Permissions Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection
import { Permissions } from './permissions.js';

Meteor.methods({
  'permission.insert': function(permissionData) {
    // Validation for Permissions Data from the Client
    new SimpleSchema({
      module: {
        type: String,
      },
      function: {
        type: String,
      },
      permission: {
        type: String,
      }
    }).validate( permissionData );

    try {
      Permissions.insert({
        module: permissionData.module,
        function: permissionData.function,
        permission: permissionData.permission
      });
    } catch(error) {
      throw new Meteor.error('error', error.reason);
    }
  },
});