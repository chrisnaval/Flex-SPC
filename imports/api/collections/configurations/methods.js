// Methods related to Configurations Collection

// Helpers
import { calculateData } from '/lib/helpers.js';

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Mongo Collection(s)
import { Configurations } from './configurations.js';
import { PerItemTestResults } from '/imports/api/collections/perItemTestResults/perItemTestResults.js';

Meteor.methods({
    'configurations.insert': function(configData) {
        // Validation of Data from the Client using the Collection's Schema
        Configurations.schema.validate(configData);

        Configurations.insert({
            configuredBy: configData.configuredBy,
            product: configData.product,
            sampleSize: configData.sampleSize,
            tester: configData.tester,
            parameter: configData.parameter,
            controlLimit: configData.controlLimit,
            specLimit: configData.specLimit,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        }, function(error, configId) {
            if(error) {
                throw new Meteor.Error('error', error.error);
            } else {
                var configuration = Configurations.findOne({ _id: configId });
                
                // Call the configurations calculation methods
                Meteor.call('configurations.calculatePerSample', configuration);
                Meteor.call('configurations.calculateOverall', configuration);
            }
        });
    },
    'configurations.remove': function(configId) {
        try {
            // Soft Delete for Configuration Collection
            Configurations.update({ _id: configId }, {
                $set: {
                    deletedAt: new Date(),
                }
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    },
    'configurations.calculatePerSample': function(configData) {
        var sampleSize = configData.sampleSize;
        var perSampleTestResults = PerItemTestResults.find({ 
            'product.name': configData.product.name,
        }, {
            sort: {
                measurement: 1
            }, limit: sampleSize, 
        }).fetch();

        var perSampleTestResultData = calculateData(perSampleTestResults);
        perSampleTestResultData.sampleSize = sampleSize;

        // Call the method to insert the perSampleTestResultData
        Meteor.call('perSampleTestResults.insert', perSampleTestResultData, function(error) {
            if(error) {
                throw new Meteor.Error('error', error.error);
            }
        });
    },
    'configurations.calculateOverall': function(configData) {
        var overallItemTestResults = PerItemTestResults.find({ 
            'product.name': configData.product.name,
        }, {
            sort: {
                measurement: 1
            },
        }).fetch();

        var overallDataCalculation = calculateData(overallItemTestResults);

        console.log(overallDataCalculation);
    }
});