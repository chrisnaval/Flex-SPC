// Definition of the Configurations Collection

import { Mongo } from 'meteor/mongo';

export const Configurations = new Mongo.Collection('configurations');

// Schema
Configurations.schema = new SimpleSchema({
  product: {
    type: Object,
    optional: false
  },
  'product._id': {
    type: String,
  },
  'product.name': {
    type: String,
  },
  sampleSize: {
    type: Number,
    optional: false,
  },
  tester: {
    type: Object,
    optional: false
  },
  'tester._id': {
    type: String,
  },
  'tester.name': {
    type: String,
  },
  parameter: {
    type: Object,
    optional: false
  },
  'parameter._id': {
    type: String,
  },
  'parameter.name': {
    type: String,
  },
  controlLimit: {
    type: Object,
    optional: false,
  },
  'controlLimit.upper': {
    type: Number,
    optional: false,
  },
  'controlLimit.lower': {
    type: Number,
    optional: false,
  },
  specLimit: {
    type: Object,
    optional: false,
  },
  'specLimit.upper': {
    type: Number,
    optional: false,
  },
  'specLimit.lower': {
    type: Number,
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