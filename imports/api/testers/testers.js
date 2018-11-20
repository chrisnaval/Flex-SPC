// Definition of the Testers Collection

import { Mongo } from 'meteor/mongo';

export const Testers = new Mongo.Collection('testers');

// Schema
Testers.schema = new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },
  paramId: {
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
  deletedAt: {
    type: Date,
    autoValue: function() {
      return null
    }
  },
});