// Methods related to Parameter-Config Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection
import { ParameterConfig } from './usersTransaction.js';

Meteor.methods({
  'parameterConfig.insert': function(parameterConfigData) {
    // validation for parameterConfig
    ParameterConfig.schema.validate(parameterConfigData);

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
        deletedAt: new Date(),
      });
    } catch(error) {
      throw new Meteor.Error('error', error.error);
    }
  },
  'parametersConfig.remove': function(parameterConfigId) {

    // make permission that only user can remove their documents
    const deleteParametersConfig = ParameterConfig.findOne(parameterConfigId);

    if (!deleteParametersConfig.editableBy(this.userId)) {
      throw new Meteor.Error(error.reason);
    }

    // soft delete for parameterConfig collection
    ParameterConfig.update({ _id: parameterConfigId }, {
        $set: {
          deletedAt: new Date(),
        }
      }
    );
  }
});