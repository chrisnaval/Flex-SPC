import './histogram.html';

// Mongo Collection(s)
import { Configurations } from '/imports/api/collections/configurations/configurations.js';
import { HistogramData } from '/imports/api/collections/histogramData/histogramData.js';

Template.Histogram.rendered = function () {
    var data = [
        ['10', 10000],
        ['15', 12000],
        ['20', 13000],
        ['30', 10000],
        ['45', 9000],
        ['60', 7000]
    ];

    var chart = anychart.column();
    var series = chart.column(data);
    
    chart.title('Histogram per Sample (Parameter)');
    chart.barGroupsPadding(0);
    chart.xAxis().title('Bin');
    chart.yAxis().title('Frequency');
    chart.container('histogram');
    chart.draw();
};
