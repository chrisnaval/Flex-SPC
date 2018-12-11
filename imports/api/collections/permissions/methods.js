// Methods related to Permissions Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection
import { Permissions } from './permissions.js';

Meteor.methods({
  'permission.insert': function(permissionData) {
    // Validation for Permissions Data from the Client
    new SimpleSchema({
      roleId: {
        type: Object,
      },
      permission: {
        type: String
      },
      functionName: {
        type: String
      },
      moduleName: {
        type: String
      },
    }).validate( permissionData );

    try {
      Permissions.insert({
        roleId: permissionData.roleId,
        permission: permissionData.permission,
        functionName: permissionData.functionName,
        moduleName: permissionData.moduleName
      });
    } catch(error) {
      throw new Meteor.error('error', error.reason);
    }
  },
});