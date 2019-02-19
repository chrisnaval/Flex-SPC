import './yield.html';

// Helpers
import { formatDataForAnyCharts } from '/lib/helpers.js';
import { setLimit } from '/lib/helpers.js';

// Meteor Package(s)
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

// Mongo Collection(s)
import { Configurations } from '/imports/api/collections/configurations/configurations.js';

// Overall Items
import { calculateOverallItems } from '/lib/overall-calculator.js';

// Yield Chart
const yieldChart = anychart.line();
// Global Var for Yield Chart Data
var yieldChartDataOverall = [];
var yieldChartDataPerSample = [];
var yieldChartDataType;

/*
 * Creates Yield Chart
 * @param data
*/
export const createYield = function createYield(data, type) {
    yieldChartDataType = type;
    yieldChart.removeAllSeries();

    // Identify the type of data to display on chart
    if(type == "per sample") {
        yieldChartDataPerSample = data;

        if(yieldChartDataPerSample.chartData) {
            yieldChart.yScale()
            .minimum(yieldChartDataPerSample.yScale.min)
            .maximum(yieldChartDataPerSample.yScale.max);
            
            yieldChart.title('Yield Chart');
            yieldChart.container('yield-chart');
            
            var series = yieldChart.spline(yieldChartDataPerSample.chartData);
            series.stroke('#0000FF');
            series.name('Measurement');

            // Upper Control Limit
            var series2 = yieldChart.spline(yieldChartDataPerSample.ucl);
            series2.stroke('#FFFF00');
            series2.name('Upper Control Limit');
            // Lower Control Limit
            var series3 = yieldChart.spline(yieldChartDataPerSample.lcl);
            series3.stroke('#FFFF00');
            series3.name('Lower Control Limit');

            // Upper Specification Limit
            var series4 = yieldChart.spline(yieldChartDataPerSample.usl);
            series4.stroke('#FF0000');
            series4.name('Upper Specification Limit');
            // Lower Specification Limit
            var series5 = yieldChart.spline(yieldChartDataPerSample.lsl);
            series5.stroke('#FF0000');
            series5.name('Lower Specification Limit');

            var legend = yieldChart.legend();
            legend.enabled(true)
                .position('bottom');

            yieldChart.draw();
        }
    } else {
        yieldChartDataOverall = data;

        if(yieldChartDataOverall.chartData) {
            yieldChart.yScale()
            .minimum(yieldChartDataOverall.yScale.min)
            .maximum(yieldChartDataOverall.yScale.max);
            
            yieldChart.title('Yield Chart');
            yieldChart.container('yield-chart');
            
            var series = yieldChart.spline(yieldChartDataOverall.chartData);
            series.stroke('#0000FF');
            series.name('Measurement');

            // Upper Control Limit
            var series2 = yieldChart.spline(yieldChartDataOverall.ucl);
            series2.stroke('#FFFF00');
            series2.name('Upper Control Limit');
            // Lower Control Limit
            var series3 = yieldChart.spline(yieldChartDataOverall.lcl);
            series3.stroke('#FFFF00');
            series3.name('Lower Control Limit');

            // Upper Specification Limit
            var series4 = yieldChart.spline(yieldChartDataOverall.usl);
            series4.stroke('#FF0000');
            series4.name('Upper Specification Limit');
            // Lower Specification Limit
            var series5 = yieldChart.spline(yieldChartDataOverall.lsl);
            series5.stroke('#FF0000');
            series5.name('Lower Specification Limit');

            var legend = yieldChart.legend();
            legend.enabled(true)
                .position('bottom');

            yieldChart.draw();
        }
    }
}

Template.Yield.onCreated(function() {
    // Identify the type of data to display on chart
    if(yieldChartDataType == "per sample") {
        createYield(yieldChartDataPerSample, yieldChartDataType);
    } else {
        Tracker.autorun(() => {
            // Subscription(s)
            var configSubscription = Meteor.subscribe('configurations.all');
            Meteor.subscribe('perItemTestResults.all');
    
            if(configSubscription.ready()) {
                Session.set('configuration', Configurations.findOne());
                
                var configuration = Session.get('configuration');
                var overallItems = calculateOverallItems(configuration);
                var chartData = formatDataForAnyCharts(overallItems.items);
                var yieldChartData = {
                    yScale: {
                        min: overallItems.minimum,
                        max: configuration.specLimit.upperSpecLimit
                    },
                    chartData: chartData,
                    ucl: setLimit(chartData, configuration.controlLimit.upperControlLimit),
                    lcl: setLimit(chartData, configuration.controlLimit.lowerControlLimit),
                    usl: setLimit(chartData, configuration.specLimit.upperSpecLimit),
                    lsl: setLimit(chartData, configuration.specLimit.lowerSpecLimit),
                };
    
                yieldChartDataOverall = yieldChartData;
                yieldChartDataType = "overall";
    
                createYield(yieldChartDataOverall, yieldChartDataType);
            }
        });
    }
});

Template.Yield.onRendered(function() {
    var yieldChartData;
    
    // Identify the type of data to display on chart
    if(yieldChartDataType == "per sample") {
        yieldChartData = yieldChartDataPerSample;
    } else {
        yieldChartData = yieldChartDataOverall;
    }

    createYield(yieldChartData, yieldChartDataType);
});