// Publications related to Reports Module

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


// Mongo Collection(s)
import { PerItemTestResults } from '/imports/api/collections/perItemTestResults/perItemTestResults.js';
import { Configurations } from '/imports/api/collections/configurations/configurations.js';

/* 
 * Global Function for Histogram Calculation
 */
function histogramFormatData(data) {

    var measurements = []; // Array of measurements for calculation purposes

    data.forEach(function(overAllItem) {
        measurements.push(overAllItem.measurement);
    });
    
    // Get the length of the measurements array
    var measurementsLength = measurements.length;
    
    var bin = 5; // Default Bin of 5
    // Minimum and Maximum of all sampleItems
    var overallMin = measurements[0];
    var overallMax = measurements[measurementsLength - 1];
    
    // Minimum and Maximum per data for binRange
    var minimum = overallMin;
    var maximum = 0;

    var dataWithBinRange = []; // Array for all data with binRange
    for(var i = 0; i < measurementsLength; i++) {
        if(minimum == overallMin) {
            maximum = minimum + (bin-1);
        }

        if(measurements[i] > maximum) {
            minimum = minimum + bin;
            maximum = (minimum-1) + bin
        }

        if(measurements[i] >= (overallMax - (bin-1)) || measurements[i] == overallMax) {
            maximum = overallMax;
            minimum = overallMax - (bin-1);
        }
        
        var perDataWithBinRange = {
            bin: bin,
            binRange: {
                minimum: minimum,
                maximum: maximum,
            },
            minimum: minimum, // For grouping of data purposes
        };

        dataWithBinRange.push(perDataWithBinRange);
    }
    
    // Group each data by its minimum measurement
    var reducedDataPerMin = dataWithBinRange.reduce(function(accumulator, item) {  
        var key = item.minimum;

        accumulator[key] = accumulator[key] || [];
        accumulator[key].push(item);
        
        return accumulator;
    }, []);

    // Simplify the grouped data by its minimum measurement and identify the binCount
    var reducedDataPerMinWithCount = [];
    for(var key of reducedDataPerMin.keys()) {
        var dataArray = reducedDataPerMin[key];
        if(dataArray) {
            var binCount = dataArray.length;
            dataArray.forEach(element => {
                delete element.minimum;
                element.binCount = binCount;
                return element;
            });

            reducedDataPerMinWithCount.push(dataArray);
        }
    }
    
    var dataValue = []; // format data of histogram for over all

    reducedDataPerMinWithCount.forEach(function(histogramData) {
        histogramData.forEach(function(histogramFormat) {
            dataList = [
                histogramFormat.binRange.minimum + '-' + histogramFormat.binRange.maximum,
                histogramFormat.binCount
            ]
            dataValue.push(dataList);
        });
    });
    
    return dataValue;
}
Meteor.publish('histogram.overAll', function(configId) {
    check(configId, String);
    var configuration = Configurations.findOne({ _id: configId });
    console.log(histogramFormatData(PerItemTestResults.find({ 'product.name': configuration.product.name }).fetch()));
});