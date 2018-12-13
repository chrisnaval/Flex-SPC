// Definition of the PerItemTestResults Collection

import { Mongo } from 'meteor/mongo';

export const PerItemTestResults = new Mongo.Collection('perItemTestResults');

// Schema
PerItemTestResults.schema = new SimpleSchema({
  assembly: {
    type: String,
    optional: false,
  },
  product: {
    type: Object,
    optional: false,
  },
  'product._id': {
    type: String,
    optional: false,
  },
  'product.name': {
    type: String,
    optional: false,
  },
  itemCode: {
    type: String,
    optional: false,
  },
  testResults: {
    type: Array,
    optional: false,
  },
  'testResults.$': {
    type: Object,
  },
  'testResults.$.tester': {
    type: Object,
    optional: false,
  },
  'testResults.$.tester._id': {
    type: String,
    optional: false,
  },
  'testResults.$.tester.name': {
    type: String,
    optional: false,
  },
  'testResults.$.parameters': {
    type: Array,
    optional: false,
  },
  'testResults.$.parameters.$': {
    type: Object,
    optional: false,
  },
  'testResults.$.parameters.$._id': {
    type: String,
    optional: false,
  },
  'testResults.$.parameters.$.paramName': {
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