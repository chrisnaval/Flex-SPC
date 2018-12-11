// Definition of the RolePermissions Collection

import { Mongo } from 'meteor/mongo';

export const rolePermissions = new Mongo.Collection('rolePermissions');

// Schema
rolePermissions.schema = new SimpleSchema({
  role: {
    type: Object,
    optional: false
  },
  permission: {
    type: [Object],
    optional: false
  },
});