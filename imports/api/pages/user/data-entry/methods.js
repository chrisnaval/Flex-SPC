// Methods related to User Transaction on Data Entry Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection
import { Parameters } from '/imports/api/parameters/parameters.js';
import { ParameterConfig } from '/imports/api/parameterConfig/parameterConfig.js';

Meteor.methods({
  'dataEntry.insert': function(parameterConfigData, parameterData) {
    // validation for parameters Collection
    new SimpleSchema({
      name: {
        type: String
      },
    }).validate( parameterData );

    // validation for parameterConfig Collection
    new SimpleSchema({
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
    }).validate( parameterConfigData );

    try {
      // parameter insert method
      Parameters.insert({
        name: parameterData.name,
        createdAt: new Date(),
        deletedAt: null,
      });

      // parameterConfig insert method
      ParameterConfig.insert({
        sampleSize: parameterConfigData.sampleSize,
        xBarCtrlLimit: parameterConfigData.xBarCtrlLimit,
        xBarUpperCtrlLimit: parameterConfigData.xBarCtrlLimit, 
        xBarLowerCtrlLimit: parameterConfigData.xBarSpecLimit, 

        xBarSpecLimit: parameterConfigData.xBarSpecLimit,
        xBarUpperSpecLimit: parameterConfigData.rChartCtrlLimit, 
        xBarLowerSpecLimit: parameterConfigData.rChartSpecLimit, 

        rChartCtrlLimit: parameterConfigData.rChartCtrlLimit,
        rUpperCtrlLimit: parameterConfigData.rChartSpecLimit,
        rLowerCtrlLimit: parameterConfigData.rChartSpecLimit,

        rChartSpecLimit: parameterConfigData.rChartSpecLimit,
        rUpperSpecLimit: parameterConfigData.rChartSpecLimit,
        rLowerSpecLimit: parameterConfigData.rChartSpecLimit,
        createdAt: new Date(),
        deletedAt: null,
      });

    } catch(error) {
      throw new Meteor.Error('error', error.error);
    }
  },
  'dataEntry.remove': function(parameterId, parameterConfigId) {

    try {
      // soft delete for parameter Collection
      Parameters.update({ _id: parameterId }, {
        $set: {
          deletedAt: new Date(),
        }
      });
      // soft delete for parameterConfig Collection
      ParameterConfig.update({ _id:parameterConfigId}, {
        $set: {
          deletedAt: new Date(),
        }
      });
    } catch(error) {
      throw new Meteor.Error('error', error.error);
    }
  }
});