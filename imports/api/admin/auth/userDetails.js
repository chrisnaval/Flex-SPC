// Definition of the User Details Collection

import { Mongo } from 'meteor/mongo';

export const UserDetails = new Mongo.Collection('userDetails');

// Schema
UserDetails.schema = new SimpleSchema({
  userName: {
    type: String,
    optional: false
  },
  firstName: {
    type: String,
    optional: false,
  },
  lastName: {
    type: String,
    optional: false,
  },
  gender: {
    type: String,
    allowedValues: ['male', 'female'],
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