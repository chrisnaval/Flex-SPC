// Definition of the Per Sample Test Results Collection

import { Mongo } from 'meteor/mongo';

export const PerSampleTestResults = new Mongo.Collection('perSampleTestResults');

// Schema
PerSampleTestResults.schema = new SimpleSchema({
  sampleItems: {
    type: Array,
    optional: false,
  },
  'sampleItems.$': {
    type: Object,
    optional: false,
  },
  paramId: {
    type: String,
    optional: false,
  },
  paramConfigXBar: {
    type: Number,
    optional: false,
  },
  paramConfigRChart: {
    type: Number,
    optional: false
  },
  paramConfig: {
    type: Number,
    optional: false
  },
  xBarResult: {
    type: Number,
    optional: false,
  },
  rChartResult: {
    type: Number,
    optional: false
  },
  min: {
    type: Number,
    optional: false
  },
  firstQuartile: {
    type: Number,
    optional: false
  },
  median: {
    type: Number,
    optional: false
  },
  thirdQuartile: {
    type: Number,
    optional: false
  },
  max: {
    type: Number,
    optional: false
  },
  histogramPerSample: {
    type: Number,
    optional: true
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
      return null;
    }
  },
});