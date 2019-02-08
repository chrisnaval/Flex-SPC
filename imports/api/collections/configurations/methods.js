// Methods related to Configurations Collection

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
                var sampleSize = configuration.sampleSize;
                var perSampleTestResults = PerItemTestResults.find({ 
                    'product.name': configuration.product.name,
                }, {
                    sort: {
                        measurement: 1
                    }, limit: sampleSize, 
                }).fetch();

                var measurements = []; // Array of measurements for calculation purposes
                perSampleTestResults.forEach(function(perSampleTestResult) {
                    measurements.push(perSampleTestResult.measurement);
                });

                // Get the length of the measurements array
                var measurementsLength = measurements.length;

                // Calculate the minimum and maximum of the perSampleTestResults
                var maximum = Math.max.apply(null, measurements);
                var minimum = Math.min.apply(null, measurements);

                // Calculation for the xBarResult
                var xBar = 0;
                for(var i = 0; i < measurementsLength; i++) {
                    xBar += parseInt(measurements[i]);
                }
                var xBarResult = xBar / measurementsLength;
                // Calculate the Range
                var range = maximum - minimum;

                // Calculate the Median
                var median = 0;
                if(measurementsLength % 2 === 0) {
                    // Average of the two middle elements from the measurements array
                    median = (measurements[measurementsLength / 2 - 1] + measurements[measurementsLength / 2]) / 2;
                } else {
                    // Middle element from the measurements array
                    median = measurements[(measurementsLength - 1) / 2];
                }

                // Calculate the First Quartile and the Third Quartile of the measurements array
                var fQIndex = Math.floor(measurementsLength * 0.25);
                var tQIndex = Math.floor(measurementsLength * 0.75);
                var firstQuartile = measurements[fQIndex];
                var thirdQuartile = measurements[tQIndex];

                var perSampleTestResultData = {
                    sampleSize: sampleSize,
                    sampleItems: perSampleTestResults,
                    xBarResult: xBarResult,
                    rChartResult: range,
                    minimum: minimum,
                    firstQuartile: firstQuartile,
                    median: median,
                    thirdQuartile: thirdQuartile,
                    maximum: maximum,
                };

                // Call the method to insert the perSampleTestResultData
                Meteor.call('perSampleTestResults.insert', perSampleTestResultData, function(error) {
                    if(error) {
                        throw new Meteor.Error('error', error.error);
                    }
                });
            }
        });
    },
    'configurations.remove': function(configDataId) {
        try {
            // Soft Delete for Configuration Collection
            Configurations.update({ _id: configDataId }, {
                $set: {
                    deletedAt: new Date(),
                }
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    }
});