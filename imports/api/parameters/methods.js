// Methods related to Parameters Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection
import { Parameters } from './parameters.js';

Meteor.methods({
  'parameters.insert': function(parameterData) {
    new SimpleSchema({
      name: {
        type: String
      },
      sampleSize: {
        type: Number
      },
      xBarCtrlLimit: {
        type: Object
      },
      'xBarCtrlLimit.xBarUpperCtrlLimit': {
        type: Number,
      },
      'xBarCtrlLimit.xBarLowerCtrlLimit': {
        type: Number,
      },
      xBarSpecLimit: {
        type: Object
      },
      'xBarSpecLimit.xBarUpperSpecLimit': {
        type: Number,
      },
      'xBarSpecLimit.xBarLowerSpecLimit': {
        type: Number,
      },
      rChartCtrlLimit: {
        type: Object
      },
      'rChartCtrlLimit.rUpperCtrlLimit': {
        type: Number,
      },
      'rChartCtrlLimit.rLowerCtrlLimit': {
        type: Number,
      },
      rChartSpecLimit: {
        type: Object
      },
      'rChartSpecLimit.rUpperSpecLimit': {
        type: Number,
      },
      'rChartSpecLimit.rLowerSpecLimit': {
        type: Number,
      },
    }).validate( parameterData );

    if (!this.userId) {
      throw new Meteor.Error(error.reason);
    }

    try {
      Parameters.insert({
        name: parameterData.name,
        sampleSize: parameterData.sampleSize,
        xBarCtrlLimit: parameterData.xBarCtrlLimit,
        xBarUpperCtrlLimit: parameterData.xBarCtrlLimit, 
        xBarLowerCtrlLimit: parameterData.xBarSpecLimit, 

        xBarSpecLimit: parameterData.xBarSpecLimit,
        xBarUpperSpecLimit: parameterData.rChartCtrlLimit, 
        xBarLowerSpecLimit: parameterData.rChartSpecLimit, 

        rChartCtrlLimit: parameterData.rChartCtrlLimit,
        rUpperCtrlLimit: parameterData.rChartSpecLimit,
        rLowerCtrlLimit: parameterData.rChartSpecLimit,

        rChartSpecLimit: parameterData.rChartSpecLimit,
        rUpperSpecLimit: parameterData.rChartSpecLimit,
        rLowerSpecLimit: parameterData.rChartSpecLimit,
        createdAt: new Date(),
        deletedAt: null,
      });
    } catch(error) {
      throw new Meteor.Error('error', error.error);
    }
  },
  'Parameters.remove': function(parameterId) {

    const deleteParameters = Parameters.findOne(parameterId);

    if (!deleteParameters.editableBy(this.userId)) {
      throw new Meteor.Error(error.reason);
    }

    Parameters.update({ _id: parameterId }, {
        $set: {
          deletedAt: new Date(),
        }
      }
    );
  }
});