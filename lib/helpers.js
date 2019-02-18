// Helpers

/* 
 * Function for Data Calculation
 *
 * @param array dataTestResults
 * @return object
 */
export const calculateData = function calculateData(dataTestResults) {
    var measurements = []; // Array of measurements for calculation purposes
    dataTestResults.forEach(function(dataTestResult) {
        measurements.push(dataTestResult.measurement);
    });

    // Get the length of the measurements array
    var measurementsLength = measurements.length;

    // Calculate the minimum and maximum of the dataTestResults
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

    return {
        items: dataTestResults,
        xBarResult: xBarResult,
        rChartResult: range,
        minimum: minimum,
        firstQuartile: firstQuartile,
        median: median,
        thirdQuartile: thirdQuartile,
        maximum: maximum
    };
}

/* 
 * Function for AnyCharts Data Format 
 *
 * @param array dataTestResults
 * @return array
 */
export const formatDataForAnyCharts = function formatDataForAnyCharts(sampleItemsData) {
    var formattedDataArray = [];
    
    sampleItemsData.forEach(element => {
        sampleItem = {
            x: element.dataResultCreatedAt,
            value: element.measurement
        };

        formattedDataArray.push(sampleItem);
    });

    return formattedDataArray;
}

/* 
 * Set Control/Specification Limit(s)
 *
 * @param bases
 * @param limit
 * @return array
 */
export const setLimit = function setLimit(bases, limit) {
    var dataArray = [];
    
    bases.forEach(element => {
        dataLimit = {
            x: element.x,
            value: limit
        };

        dataArray.push(dataLimit);
    });

    return dataArray;
}

export const histogramOverAllFormat = function histogramOverAllFormat(data) {
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