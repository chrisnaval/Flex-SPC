// Methods related to Configuration Setup

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { Parameters } from '/imports/api/collections/parameters/parameters.js';
import { ParameterConfig } from '/imports/api/collections/parameterConfig/parameterConfig.js';

Meteor.methods({
  'createConfiguration': function(parameterConfigData, parameterData) {
    
    // Validation of data from the client using schema
    Parameters.schema.validate(parameterConfigData);
    ParameterConfig.schema.validate(parameterData);

    try {
        Parameters.insert({
            name: parameterData.name,
            createdAt: new Date(),
            deletedAt: null,
        });

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
  'removeConfiguration': function(parameterId, parameterConfigId) {
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