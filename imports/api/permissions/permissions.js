// Definition of the Permissions Collection

import { Mongo } from 'meteor/mongo';

export const Permissions = new Mongo.Collection('permissions');

// Schema
Permissions.schema = new SimpleSchema({
  roleId: {
    type: String,
  },
  permission: {
    type: String,
  },
});