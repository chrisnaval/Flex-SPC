import './xbar.html';

// X-bar Chart
const xBarChart = anychart.line();
// Global Var for X-bar Chart Data
var xBarChartData = [];

/*
 * Creates X-bar Chart
 * @param data
*/
export const createXBar = function createXBar(data) {
    // Set Global Data for Chart
    xBarChartData = data;
    
    if(xBarChartData.chartData) {
        xBarChart.yScale()
		.minimum(xBarChartData.yScale.min)
		.maximum(xBarChartData.yScale.max);
		
        xBarChart.title('X-Bar Chart');
        xBarChart.container('x-bar-chart');
        
        var series = xBarChart.line(xBarChartData.chartData);
        series.stroke('#0000FF');
        series.name('Measurement');

        // Upper Control Limit
        var series2 = xBarChart.line(xBarChartData.ucl);
        series2.stroke('#FFFF00');
        series2.name('Upper Control Limit');
        // Lower Control Limit
        var series3 = xBarChart.line(xBarChartData.lcl);
        series3.stroke('#FFFF00');
        series3.name('Lower Control Limit');

         // Upper Specification Limit
         var series4 = xBarChart.line(xBarChartData.usl);
         series4.stroke('#FF0000');
         series4.name('Upper Specification Limit');
         // Lower Specification Limit
         var series5 = xBarChart.line(xBarChartData.lsl);
         series5.stroke('#FF0000');
         series5.name('Lower Specification Limit');

        var legend = xBarChart.legend();
        legend.enabled(true)
            .position('bottom');

        xBarChart.draw();
    }
}

Template.X_bar.onCreated(function() {
    xBarChart.removeAllSeries();
    createXBar(xBarChartData);
});

Template.X_bar.onRendered(function() {
    xBarChart.removeAllSeries();
    createXBar(xBarChartData);
});