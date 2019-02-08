// Methods related to Per Sample Test Results Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { PerSampleTestResults } from './perSampleTestResults.js';


Meteor.methods({
    'perSampleTestResults.insert': function(perItemTestResultData) {

        try {
            PerSampleTestResults.insert({
                sampleSize: perItemTestResultData.sampleSize,
                sampleItems: perItemTestResultData.sampleItems,
                xBarResult: perItemTestResultData.xBarResult,
                rChartResult: perItemTestResultData.range,
                minimum: perItemTestResultData.minimum,
                maximum: perItemTestResultData.maximum,
                median: perItemTestResultData.median,
                firstQuartile: perItemTestResultData.firstQuartile,
                thirdQuartile: perItemTestResultData.thirdQuartile,
                createdAt: new Date(),
            }, function(error, perSampleTestId) {
                if(error) {
                    throw new Meteor.Error('error', error.error);
                } else {
                    var perSampleTestResults = PerSampleTestResults.findOne({ _id: perSampleTestId });
                    var sampleItems = perSampleTestResults.sampleItems;

                    var measurements = []; //array of measurements

                    sampleItems.forEach(function(element) {
                        element.measurement;
                        measurements.push(element.measurement);
                    });

                    function histogram(measurements) {
                        var dataLength = measurements.length;
                        var overallMin = measurements[0];
                        var overallMax = measurements[dataLength - 1];
                        var bin = 5;
                    
                        var min = overallMin;
                        var max = 0;
                    
                        var perDataRange = [];
                    
                        for(var i = 0; i < measurements.length; i++) {
                            if(min == overallMin) {
                                max = min + (bin-1);
                            }

                            if(measurements[i] > max) {
                                min = min + bin;
                                max = (min-1) + bin
                            }

                            if(measurements[i] >= (overallMax - (bin-1)) || measurements[i] == overallMax) {
                                max = overallMax;
                                min = overallMax - (bin-1);
                            }
                            
                            var histogramData = {
                                bin: 5,
                                binRange: {
                                    min: min,
                                    max: max,
                                },
                                min: min,
                                sampleItem: {
                                    measurement: measurements[i]
                                }
                            };

                            perDataRange.push(histogramData);
                        }

                        var dataPerMin = perDataRange.reduce(function(accumulator, item) {  
                            var key = item.min;
                            accumulator[key] = accumulator[key] || [];
                            accumulator[key].push(item);
                            
                            return accumulator;
                        }, []);

                        var reducedDataPerMin = [];
                        for(var key of dataPerMin.keys()) {
                            var dataArray = dataPerMin[key];
                            if(dataArray) {
                                var binCount = dataArray.length;
                                dataArray.forEach(element => {
                                    delete element.min;
                                    element.binCount = binCount;
                                    return element;
                                });

                                reducedDataPerMin.push(dataArray);
                            }
                        }
                        return reducedDataPerMin;
                    }
                    var histogramDatas = histogram(measurements);
                    
                    Meteor.call('histogramData.insert', histogramDatas, function(error) {
                        if(error) {
                            throw new Meteor.Error('error', error.error);
                        }
                    });
                }
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    },
});