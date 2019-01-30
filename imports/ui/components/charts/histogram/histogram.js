import './histogram.html';
import {min} from 'simple-statistics';
import {max} from 'simple-statistics';
import {standardDeviation} from 'simple-statistics';

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
        
    var histogram = [69.9, 69.0, 69.6, 68.5, 65.0, 65.9, 67.2, 67.5, 68.0, 68.6, 68.9, 70.0,
        69.5, 70.4, 71.1, 71.0, 72.5, 73.1, 68.8, 71.3, 68.2, 68.5, 70.0, 66.8, 69.0, 69.3, 69.1, 69.4,
        68.5, 65.5, 66.0, 66.5, 67.5, 68.3, 68.2, 69.1, 70.2, 69.5, 70.5, 70.8, 71.0, 72.5, 73.0,
        69.0, 71.3, 68.2, 68.5, 70.0, 67.0, 69.2];

    var standarDev = standardDeviation(histogram) / 5;
    // console.log(standarDev);

    function minMinusMax(maxArray, minArray) {
        
        var maxArray = max(histogram);
        var minArray = min(histogram);
        return maxArray - minArray;
    };
    var getTheClassInterval = minMinusMax() / 10;

    var numberOfClassIntervals = minMinusMax() / standarDev; 
    console.log(numberOfClassIntervals);

    function classIntervals() {

        var sqaureRootOfClassIntervals = Math.sqrt(histogram.length);
        return Math.round(sqaureRootOfClassIntervals);
    };
    console.log(classIntervals()); 
};
