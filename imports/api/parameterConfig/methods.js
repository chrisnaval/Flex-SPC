// Methods related to Parameter Config Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// meteor package for SimpleSchema
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection
import { ParameterConfig } from './usersTransaction.js';

Meteor.methods({
  'parameterConfig.insert': function(parameterConfigData) {
    new SimpleSchema({
      sampleSize: {
        type: Number
      },
      parameters: {
        type: Object
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
      ParameterConfig.insert({
        sampleSize: parameterConfigData.sampleSize,
        parameters: parameterConfigData.parameters,
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
  'parametersConfig.remove': function(parameterConfigId) {

    const deleteParametersConfig = ParameterConfig.findOne(parameterConfigId);

    if (!deleteParametersConfig.editableBy(this.userId)) {
      throw new Meteor.Error(error.reason);
    }

    ParameterConfig.update({ _id: parameterConfigId }, {
        $set: {
          deletedAt: new Date(),
        }
      }
    );
  }
});