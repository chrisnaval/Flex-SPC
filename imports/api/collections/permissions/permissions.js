// Definition of the Permissions Collection

import { Mongo } from 'meteor/mongo';

export const Permissions = new Mongo.Collection('permissions');

// Schema
Permissions.schema = new SimpleSchema({
  module: {
    type: String,
    optional: false
  },
  function: {
    type: String,
    optional: false
  },
  permission: {
    type: String,
    optional: false
  }
});