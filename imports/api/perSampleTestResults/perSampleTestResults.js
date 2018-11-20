// Definition of the Per Sample Test Results Collection

import { Mongo } from 'meteor/mongo';

export const PerSampleTestResults = new Mongo.Collection('perSampleTestResults');

// Schema
PerSampleTestResults.schema = new SimpleSchema({
  sampleItems: {
    type: Array,
  },
  'sampleItems.$': {
    type: Object,
  },
  parameterId: {
    type: String,
  },
  parameterConfigXBar: {
    type: Number,
    optional: true
  },
  parameterConfigRChart: {
    type: Number,
    optional: true
  },
  parameterConfig: {
    type: Number,
    optional: true
  },
  xBarResult: {
    type: Number,
    optional: true,
  },
  rChartResult: {
    type: Number,
    optional: true
  },
  minimum: {
    type: Number,
    optional: true
  },
  firstQuartile: {
    type: Number,
    optional: true
  },
  median: {
    type: Number,
    optional: true
  },
  thirdQuartile: {
    type: Number,
    optional: true
  },
  maximum: {
    type: Number,
    optional: true
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