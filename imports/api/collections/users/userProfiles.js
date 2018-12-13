// Definition of the UserProfiles Collection

import { Mongo } from 'meteor/mongo';

export const UserProfiles = new Mongo.Collection('userProfiles');

// Schema
UserProfiles.schema = new SimpleSchema({
  firstName: {
    type: String,
    optional: false,
  },
  lastName: {
    type: String,
    optional: false,
  },
  address: {
    type: String,
    optional: false,
  },
  type: {
    type: String,
    optional: false,
  },
  role: {
    type: Object,
    optional: false,
  },
  'role._id': {
    type: String,
  },
  'role.role': {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date()
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      return new Date()
    }
  },
});