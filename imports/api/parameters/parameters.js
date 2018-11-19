// Definition of the Parameters Collection

import { Mongo } from 'meteor/mongo';

export const Parameters = new Mongo.Collection('parameters');

// Schema
Parameters.schema = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  sampleSize: {
    type: Number,
    optional: true
  },
  xBarCtrlLimit: {
    type: Object,
  },
  xBarSpecLimit: {
    type: Object,
  },
  rChartCtrlLimit: {
    type: Object,
  },
  rChartSpecLimit: {
    type: Object,
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