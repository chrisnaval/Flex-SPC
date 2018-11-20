// Definition of the Parameters Collection

import { Mongo } from 'meteor/mongo';

export const Parameters = new Mongo.Collection('parameters');

// Schema
Parameters.schema = new SimpleSchema({
  name: {
    type: String,
    optional: false,
  },
  sampleSize: {
    type: Number,
    optional: true
  },
  xBarCtrlLimit: {
    type: Object,
    optional: false,
  },
  xBarSpecLimit: {
    type: Object,
    optional: false,
  },
  rChartCtrlLimit: {
    type: Object,
    optional: false,
  },
  rChartSpecLimit: {
    type: Object,
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