// Definition of the Permissions Collection

import { Mongo } from 'meteor/mongo';

export const Permissions = new Mongo.Collection('permissions');

// Schema
Permissions.schema = new SimpleSchema({
  roleId: {
    type: Object,
    optional: false,
  },
  permission: {
    type: String,
    optional: false,
  },
  functionName: {
    type: String,
    optional: false
  },
  moduleName: {
    type: String,
    optional: false
  },
});