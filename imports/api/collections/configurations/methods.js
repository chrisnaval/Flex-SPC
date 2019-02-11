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

        var actualSize = 0;

        Configurations.insert({
            configuredBy: configData.configuredBy,
            product: configData.product,
            sampleSize: configData.sampleSize,
            actualSize: (actualSize) ? actualSize : 0,
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
    'configurations.calculatePerSample': function(configuration) {
        var sampleSize = configuration.sampleSize;
        var perSampleTestResults = PerItemTestResults.find({ 
            'product.name': configuration.product.name,
        }, {
            sort: {
                measurement: 1
            }, limit: sampleSize, 
        }).fetch();

        var perSampleTestResultData = calculateData(perSampleTestResults);
        perSampleTestResultData.configuration = configuration;

        // Call the method to insert the perSampleTestResultData
        Meteor.call('perSampleTestResults.insert', perSampleTestResultData, function(error) {
            if(error) {
                throw new Meteor.Error('error', error.error);
            }
        });
    },
    'configurations.calculateOverall': function(configuration) {
        var overallItemTestResults = PerItemTestResults.find({ 
            'product.name': configuration.product.name,
        }, {
            sort: {
                measurement: 1
            },
        }).fetch();

        var overallDataCalculation = calculateData(overallItemTestResults);

        console.log(overallDataCalculation);
    }
});