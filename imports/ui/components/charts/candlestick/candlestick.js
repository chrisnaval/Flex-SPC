import './candlestick.html';

// Helpers
import { formatDataForCandlestickChart } from '/lib/helpers.js';

// Meteor Packages
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

// Mongo Collection(s)
import { Configurations } from '/imports/api/collections/configurations/configurations.js';

// Overall Items
import { calculateOverallItems } from '/lib/overall-calculator.js';

// Candlestick Chart
var candlestickChart = anychart.stock();
// Global Var for Candlestick Chart Data
var candlestickChartDataOverall = [];
var candlestickChartDataPerSample = [];
var candlestickChartDataType;

/*
 * Creates Candlestick Chart
 * @param data
*/
export const createCandlestick = function createCandlestick(data, type) {
    candlestickChartDataType = type;

    // Identify the type of data to display on chart
    if(type == "per sample") {
        candlestickChartDataPerSample = data;

        table = anychart.data.table('x');
        table.removeData();
        table.addData(candlestickChartDataPerSample);

        mapping = table.mapAs({ 'open': 'o', 'high': 'h', 'low': 'l', 'close': 'c' });

        var series = candlestickChart.plot(0).candlestick(mapping);
        series.name('Parameter');

        candlestickChart.container('candlestick-chart');
        candlestickChart.draw();
    } else {
        candlestickChartDataOverall = data;

        table = anychart.data.table('x');
        table.addData(candlestickChartDataOverall);

        mapping = table.mapAs({ 'open': 'o', 'high': 'h', 'low': 'l', 'close': 'c' });

        var series = candlestickChart.plot(0).candlestick(mapping);
        series.name('Parameter');

        candlestickChart.container('candlestick-chart');
        candlestickChart.draw();
    }
}

Template.Candlestick.onCreated(function() {
    // Identify the type of data to display on chart
    if(candlestickChartDataType == "per sample") {
        createCandlestick(candlestickChartDataPerSample, candlestickChartDataType);
    } else {
        Tracker.autorun(() => {
            // Subscription(s)
            var configSubscription = Meteor.subscribe('configurations.all');
            Meteor.subscribe('perItemTestResults.all');
    
            if(configSubscription.ready()) {
                Session.set('configuration', Configurations.findOne());
    
                var configuration = Session.get('configuration');
                var overallItemsCalculation = calculateOverallItems(configuration);
                var candlestickChartData = formatDataForCandlestickChart(overallItemsCalculation, overallItemsCalculation.items);

                candlestickChartDataOverall = candlestickChartData;
                candlestickChartDataType = "overall";
    
                createCandlestick(candlestickChartDataOverall, candlestickChartDataType);
            }
        });
    }
});

Template.Candlestick.onRendered(function() {
    var candlestickChartData;
    
    // Identify the type of data to display on chart
    if(candlestickChartDataType == "per sample") {
        // candlestickChartData = candlestickChartDataPerSample;
    } else {
        candlestickChartData = candlestickChartDataOverall;
    }

    createCandlestick(candlestickChartData, candlestickChartDataType);
});