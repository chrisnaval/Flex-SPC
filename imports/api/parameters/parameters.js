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
    blackbox: true
  },
  'xBarCtrlLimit.xBarUpperCtrlLimit': {
    type: Number,
    optional: false,
  },
  'xBarCtrlLimit.xBarLowerCtrlLimit': {
    type: Number,
    optional: false,
  },
  xBarSpecLimit: {
    type: Object,
    optional: false,
    blackbox: true
  },
  'xBarSpecLimit.xBarUpperSpecLimit': {
    type: Number,
    optional: false,
  },
  'xBarSpecLimit.xBarLowerSpecLimit': {
    type: Number,
    optional: false,
  },
  rChartCtrlLimit: {
    type: Object,
    optional: false,
    blackbox: true
  },
  'rChartCtrlLimit.rUpperCtrlLimit': {
    type: Number,
    optional: false,
  },
  'rChartCtrlLimit.rLowerCtrlLimit': {
    type: Number,
    optional: false,
  },
  rChartSpecLimit: {
    type: Object,
    optional: false,
    blackbox: true
  },
  'rChartSpecLimit.rUpperSpecLimit': {
    type: Number,
    optional: false,
  },
  'rChartSpecLimit.rLowerSpecLimit': {
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