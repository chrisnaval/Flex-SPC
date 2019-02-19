import './histogram.html';

// Meteor Package(s)
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

// Mongo Collection(s)
import { Configurations } from '/imports/api/collections/configurations/configurations.js';

// Overall Items
import { calculateHistogramOverallItems } from '/lib/overall-calculator.js';

//histogram
const histogramChart = anychart.column();

// Global Variable(s) and Function(s)
var histogramChartDataPerSample = [];
var histogramChartDataOverall = [];
var histogramChartDataType;
/*
 * Creates Histogram Chart
 * @param data
*/
export const createHistogram = function createHistogram(data, type) {
    histogramChart.removeAllSeries();
    histogramChartDataType = type;

    if(histogramChartDataType === 'per sample') {
        histogramChartDataPerSample = data;
        
        if(histogramChartDataPerSample) {
            var series = histogramChart.column(histogramChartDataPerSample);

            histogramChart.title('Histogram');
            histogramChart.barGroupsPadding(0);
            histogramChart.xAxis().title('Bin');
            histogramChart.yAxis().title('Frequency');
            histogramChart.container('histogram');
            histogramChart.draw();
        }
    } else {
        histogramChartDataOverall = data;
        
        if(histogramChartDataOverall) {
            var series = histogramChart.column(histogramChartDataOverall);

            histogramChart.title('Histogram');
            histogramChart.barGroupsPadding(0);
            histogramChart.xAxis().title('Bin');
            histogramChart.yAxis().title('Frequency');
            histogramChart.container('histogram');
            histogramChart.draw();
        }
    }
}

// onCreated
Template.Histogram.onCreated(function() {

    if(histogramChartDataType === 'per sample') {
        createHistogram(histogramChartDataPerSample, histogramChartDataType);
    } else {
        Tracker.autorun(() => {
            // Subscription(s)
            var configSubscription = Meteor.subscribe('configurations.all');
            Meteor.subscribe('perItemTestResults.all');
    
            if(configSubscription.ready()) {
                Session.set('configuration', Configurations.findOne());
                var configuration = Session.get('configuration');
                histogramChartData = calculateHistogramOverallItems(configuration);
                histogramChartDataOverall = histogramChartData;
                histogramChartDataType = "overall";

                createHistogram(histogramChartDataOverall, histogramChartDataType);
            } 
        });
    }
});

// onRendered
Template.Histogram.onRendered(function() {
    var histogramData;
    
    // Identify the type of data to display on chart
    if(histogramChartDataType == "per sample") {
        histogramData = histogramChartDataPerSample;
    } else {
        histogramData = histogramChartDataOverall;
    }

    createHistogram(histogramData, histogramChartDataType);

});
