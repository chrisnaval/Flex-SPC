// Definition of the UserProfiles Collection

import { Mongo } from 'meteor/mongo';

export const UserProfiles = new Mongo.Collection('userProfiles');

// Schema
UserProfiles.schema = new SimpleSchema({
  userType: {
    type: String,
    optional: false,
  },
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