// Definition of the User Details Collection

import { Mongo } from 'meteor/mongo';

export const userDetails = new Mongo.Collection('userDetails');

// Schema
userDetails.schema = new SimpleSchema({
  userId: {
    type: String,
    autoValue: function() {
      return this.userId
    }
  },
  firstName: {
      type: String,
      optional: true
  },
  lastName: {
      type: String,
  },
  gender: {
    type: String,
    allowedValues: ['admin', 'user'],
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
  deletedAt: {
    type: Date,
    autoValue: function() {
      return null
    }
  },
});