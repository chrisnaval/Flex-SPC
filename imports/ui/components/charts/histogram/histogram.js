import './histogram.html';

//Meteor Package(s)
import { Session } from 'meteor/session';

// Mongo Collection(s)
import { Configurations } from '/imports/api/collections/configurations/configurations.js';
import { HistogramData } from '/imports/api/collections/histogramData/histogramData.js';

// Global Variable(s) and Function(s)
var histogramChart = anychart.column();

function createHistogram(data) {
    var series = histogramChart.column(data);
    
    histogramChart.title('Histogram per Sample (Parameter)');
    histogramChart.barGroupsPadding(0);
    histogramChart.xAxis().title('Bin');
    histogramChart.yAxis().title('Frequency');
    histogramChart.container('histogram');
    histogramChart.draw();
}

// onCreated
Template.Histogram.onCreated(function() {
    histogramChart.removeAllSeries();

    var data = [
        ['10', 10000],
        ['15', 12000],
        ['20', 13000],
        ['30', 10000],
        ['45', 9000],
        ['60', 7000]
    ];
    
    Session.set('histogramData', data);
});

// onRendered
Template.Histogram.onRendered(function() {
    var data = Session.get('histogramData');
    createHistogram(data);
});

// events
Template.Histogram.events({

});