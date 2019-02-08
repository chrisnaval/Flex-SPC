// Helpers

/* 
 * Global Function for Data Calculation
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