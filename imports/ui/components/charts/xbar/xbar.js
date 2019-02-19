import './xbar.html';

// X-bar Chart
const xBarChart = anychart.line();
// Global Var for X-bar Chart Data
var xBarChartDataOverall = [];
var xBarChartDataPerSample = [];
var xBarChartDataType;

/*
 * Creates X-bar Chart
 * @param data
*/
export const createXBar = function createXBar(data, type) {
    xBarChartDataType = type;
    xBarChart.removeAllSeries();

    // Identify the type of data to display on chart
    if(type == "per sample") {
        xBarChartDataPerSample = data;
        if(xBarChartDataPerSample.chartData) {
            xBarChart.yScale()
            .minimum(xBarChartDataPerSample.yScale.min)
            .maximum(xBarChartDataPerSample.yScale.max);
            
            xBarChart.title('X-Bar Chart');
            xBarChart.container('x-bar-chart');
            
            var series = xBarChart.line(xBarChartDataPerSample.chartData);
            series.stroke('#0000FF');
            series.name('Measurement');

            // Upper Control Limit
            var series2 = xBarChart.line(xBarChartDataPerSample.ucl);
            series2.stroke('#FFFF00');
            series2.name('Upper Control Limit');
            // Lower Control Limit
            var series3 = xBarChart.line(xBarChartDataPerSample.lcl);
            series3.stroke('#FFFF00');
            series3.name('Lower Control Limit');

            // Upper Specification Limit
            var series4 = xBarChart.line(xBarChartDataPerSample.usl);
            series4.stroke('#FF0000');
            series4.name('Upper Specification Limit');
            // Lower Specification Limit
            var series5 = xBarChart.line(xBarChartDataPerSample.lsl);
            series5.stroke('#FF0000');
            series5.name('Lower Specification Limit');

            var legend = xBarChart.legend();
            legend.enabled(true)
                .position('bottom');

            xBarChart.draw();
        }
    } else {
        xBarChartDataOverall = data;

        if(xBarChartDataOverall.chartData) {
            xBarChart.yScale()
            .minimum(xBarChartDataOverall.yScale.min)
            .maximum(xBarChartDataOverall.yScale.max);
            
            xBarChart.title('X-Bar Chart');
            xBarChart.container('x-bar-chart');
            
            var series = xBarChart.line(xBarChartDataOverall.chartData);
            series.stroke('#0000FF');
            series.name('Measurement');

            // Upper Control Limit
            var series2 = xBarChart.line(xBarChartDataOverall.ucl);
            series2.stroke('#FFFF00');
            series2.name('Upper Control Limit');
            // Lower Control Limit
            var series3 = xBarChart.line(xBarChartDataOverall.lcl);
            series3.stroke('#FFFF00');
            series3.name('Lower Control Limit');

            // Upper Specification Limit
            var series4 = xBarChart.line(xBarChartDataOverall.usl);
            series4.stroke('#FF0000');
            series4.name('Upper Specification Limit');
            // Lower Specification Limit
            var series5 = xBarChart.line(xBarChartDataOverall.lsl);
            series5.stroke('#FF0000');
            series5.name('Lower Specification Limit');

            var legend = xBarChart.legend();
            legend.enabled(true)
                .position('bottom');

            xBarChart.draw();
        }
    }
}

Template.X_bar.onCreated(function() {
    var xBarChartData;

    // Identify the type of data to display on chart
    if(xBarChartDataType == "per sample") {
        xBarChartData = xBarChartDataPerSample;
    } else {
        xBarChartData = xBarChartDataOverall;
    }

    createXBar(xBarChartData, xBarChartDataType);
});

Template.X_bar.onRendered(function() {
    var xBarChartData;
    
    // Identify the type of data to display on chart
    if(xBarChartDataType == "per sample") {
        xBarChartData = xBarChartDataPerSample;
    } else {
        xBarChartData = xBarChartDataOverall;
    }

    createXBar(xBarChartData, xBarChartDataType);
});