// Definition of the RolePermissions Collection

import { Mongo } from 'meteor/mongo';

export const rolePermissions = new Mongo.Collection('rolePermissions');

// Schema
rolePermissions.schema = new SimpleSchema({
  role: {
    type: Object,
    optional: false
  },
  'role._id': {
    type: String
  },
  'role.role': {
    type: String
  },
  'role.description': {
    type: String
  },
  permissions: {
    type: Array,
    optional: false
  },
  'permissions.$': {
    type: Object,
    optional: false
  },
  'permissions.$._id': {
    type: String
  },
  'permissions.$.module': {
    type: String
  },
  'permissions.$.function': {
    type: String
  },
  'permissions.$.permission': {
    type: String
  },
});