// Definition of the Histogram Data Collection

import { Mongo } from 'meteor/mongo';

export const HistogramData = new Mongo.Collection('histogramData');

// Schema
HistogramData.schema = new SimpleSchema({
  bin: {
    type: Number,
    optional: false,
  },
  binRange: {
    type: Number,
    optional: false,
  },
  binCount: {
    type: Number,
    optional: false,
  },
  sampleId: {
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
