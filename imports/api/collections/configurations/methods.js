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
                var perSampleTestResults = PerItemTestResults.find({ 'product.name': configuration.product.name }, {
                    sort: {
                        measurement: 1
                    }, limit: configuration.sampleSize, 
                }).fetch();
                var measurements = []; // array of measurement from perSampleTestResult

                for(var i = 0; i < perSampleTestResults.length; i++) {
                    var perSampleTestResult = perSampleTestResults[i];
                    var perSampleMeasurement = perSampleTestResult.measurement;

                    measurements.push(perSampleMeasurement);
                };
                var maximum = Math.max.apply(null, measurements);
                var minimum = Math.min.apply(null, measurements);

                var xBar = 0;
                var measurement = measurements;
                for( var i = 0; i < measurement.length; i++ ) {
                    xBar += parseInt( measurement[i] );
                };

                var xBarResult = xBar / measurement.length;
                var range = maximum - minimum;

                function median(measurements) {
                    var median = 0,
                    measurementsLength = measurements.length;
                    if(measurementsLength % 2 === 0) {
                        // average of two middle numbers on the measurement
                        median = (measurements[measurementsLength / 2 - 1] + measurements[measurementsLength / 2]) / 2;
                    } else {
                        // middle number on measurement only
                        median = measurements[(measurementsLength - 1) / 2];
                    }
                    return median;
                };

                var sampleMeasurementsCount = measurements.length;
                var fQIndex = Math.floor(sampleMeasurementsCount * 0.25);
                var tQIndex = Math.floor(sampleMeasurementsCount * 0.75);
                var firstQuartile = measurements[fQIndex];
                var thirdQuartile = measurements[tQIndex];

                var perItemTestResultData = {
                    sampleItems: perSampleTestResults,
                    sampleSize: configData.sampleSize,
                    minimum: minimum,
                    maximum: maximum,
                    xBarResult: xBarResult,
                    rChartResult: range,
                    median: median(measurements),
                    firstQuartile: firstQuartile,
                    thirdQuartile: thirdQuartile
                };
                Meteor.call('perSampleTestResults.insert', perItemTestResultData, function(error) {
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