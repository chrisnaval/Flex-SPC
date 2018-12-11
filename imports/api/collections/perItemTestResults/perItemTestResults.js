// Definition of the PerItemTestResults Collection

import { Mongo } from 'meteor/mongo';

export const PerItemTestResults = new Mongo.Collection('perItemTestResults');

// Schema
PerItemTestResults.schema = new SimpleSchema({
  itemId: {
    type: String,
    optional: false,
  },
  paramId: {
    type: String,
    optional: false,
  },
  paramConfig: {
    type: Number,
    decimal: true,
    optional: false,
  },
  paramConfigXBar: {
    type: Number,
    decimal: true,
    optional: false,
  },
  paramConfigRChart: {
    type: Number,
    decimal: true,
    optional: false,
  },
  xResult: {
    type: Number,
    decimal: true,
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