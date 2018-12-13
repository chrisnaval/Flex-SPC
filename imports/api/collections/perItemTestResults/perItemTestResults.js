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
  'product.productId': {
    type: String,
    optional: false,
  },
  'product.productName': {
    type: String,
    optional: false,
  },
  'product.itemCode': {
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
  'testResults.$.testerId': {
    type: String,
    optional: false,
  },
  'testResults.$.testerName': {
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
  'testResults.$.parameters.$.paramId': {
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