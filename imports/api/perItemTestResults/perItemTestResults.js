// Definition of the Per Item Test Results Collection

import { Mongo } from 'meteor/mongo';

export const PerItemTestResults = new Mongo.Collection('perItemTestResults');

// Schema
PerItemTestResults.schema = new SimpleSchema({
  itemId: {
    type: String,
  },
  paramId: {
    type: String,
  },
  paramConfig: {
    type: Number,
    decimal: true,
  },
  paramConfigXBar: {
    type: Number,
    decimal: true
  },
  paramConfigRChart: {
    type: Number,
    decimal: true,
  },
  xResult: {
    type: Number,
    decimal: true,
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
  },
});