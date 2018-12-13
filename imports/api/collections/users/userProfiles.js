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
  userType: {
    type: String,
    optional: false,
  },
  userRole: {
    type: Object,
    optional: false,
  },
  'userRole.roleId': {
    type: String,
  },
  'userRole.role': {
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