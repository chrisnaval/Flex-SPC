// Methods related to Permissions Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection
import { Permissions } from './permissions.js';

Meteor.methods({
  'permission.insert': function(permissionData) {

    // validation for permission collection
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
  'permission.update': function(permissionId, permissionData) {
    
    // validation for permission collection
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
      Permissions.update({

      });
    } catch(error) {

    }
  }
});