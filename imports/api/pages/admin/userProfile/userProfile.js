// Definition of the User Profiles Collection

import { Mongo } from 'meteor/mongo';

export const UserProfile = new Mongo.Collection('userProfile');

// Schema
UserProfile.schema = new SimpleSchema({
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
  userRole: {
    type: Object,
    optional: false,
  },
  isActive: {
    type: Boolean,
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