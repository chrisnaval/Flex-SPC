// Definition of the Histogram Data Collection

import { Mongo } from 'meteor/mongo';

export const HistogramData = new Mongo.Collection('histogramData');

// Schema
HistogramData.schema = new SimpleSchema({
  bin: {
    type: Number,
  },
  binRange: {
    type: Number,
  },
  binCount: {
    type: Number,
  },
  sampleId: {
    type: String,
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