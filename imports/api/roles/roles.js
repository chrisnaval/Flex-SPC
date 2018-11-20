// Definition of the Roles Collection

import { Mongo } from 'meteor/mongo';

export const Roles = new Mongo.Collection('roles');

// Schema
Roles.schema = new SimpleSchema({
  name: {
    type: String,
    optional: false,
  },
  permissions: {
    type: Array,
    optional: false,
  },
  'permissions.$': {
    type: Object,
    optional: false,
  },
});