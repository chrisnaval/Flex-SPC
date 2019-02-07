import './candlestick.html';

// Meteor Packages
import { Session } from 'meteor/session';

// Global Variable(s) and Function(s)
var candlestickChart = anychart.stock();

/*
 * Creates Candlestick Chart
 * @param data
*/
function createCandlestick(data) {
    table = anychart.data.table('x');
    table.addData(data);
    mapping = table.mapAs({ 'open': 'o', 'high': 'h', 'low': 'l', 'close': 'c' });

    var series = candlestickChart.plot(0).candlestick(mapping);
    series.name('(Parameter)');

    candlestickChart.title('Box Plot No. a (Parameter)');
    candlestickChart.container('candlestick');

    candlestickChart.draw();
}

Template.Candlestick.onCreated(function() {
    var data =  [
        { 'x': '2004-01-02', 'o': 92.86, 'h': 93.05, 'l': 91.20, 'c': 91.55 },
        { 'x': '2004-01-05', 'o': 92.00, 'h': 93.09, 'l': 92.00, 'c': 93.05 },
        { 'x': '2004-01-06', 'o': 92.20, 'h': 93.19, 'l': 92.14, 'c': 93.06 },
        { 'x': '2004-01-07', 'o': 93.14, 'h': 93.38, 'l': 92.47, 'c': 92.78 },
        { 'x': '2004-01-08', 'o': 93.21, 'h': 93.21, 'l': 92.03, 'c': 93.04 },
        { 'x': '2004-01-09', 'o': 91.75, 'h': 92.35, 'l': 91.00, 'c': 91.21 },
        { 'x': '2004-01-12', 'o': 91.21, 'h': 92.14, 'l': 91.21, 'c': 91.55 },
        { 'x': '2004-01-13', 'o': 91.45, 'h': 91.51, 'l': 89.01, 'c': 89.70 },
        { 'x': '2004-01-14', 'o': 89.90, 'h': 90.46, 'l': 89.75, 'c': 90.31 },
        { 'x': '2004-01-15', 'o': 95.07, 'h': 95.65, 'l': 93.55, 'c': 94.02 },
        { 'x': '2004-01-16', 'o': 95.00, 'h': 95.35, 'l': 94.71, 'c': 95.32 },
        { 'x': '2004-01-20', 'o': 96.00, 'h': 97.44, 'l': 95.73, 'c': 97.10 },
        { 'x': '2004-01-21', 'o': 97.23, 'h': 98.04, 'l': 96.64, 'c': 97.70 },
        { 'x': '2004-01-22', 'o': 97.84, 'h': 98.16, 'l': 97.32, 'c': 97.51 },
        { 'x': '2004-01-23', 'o': 97.82, 'h': 98.21, 'l': 97.10, 'c': 97.90 },
        { 'x': '2004-01-26', 'o': 97.90, 'h': 99.85, 'l': 97.56, 'c': 99.85 },
        { 'x': '2004-01-27', 'o': 99.40, 'h': 99.67, 'l': 98.70, 'c': 98.80 },
        { 'x': '2004-01-28', 'o': 99.15, 'h': 99.42, 'l': 97.28, 'c': 97.38 },
        { 'x': '2004-01-29', 'o': 98.10, 'h': 98.60, 'l': 96.55, 'c': 98.01 },
        { 'x': '2004-01-30', 'o': 98.02, 'h': 99.33, 'l': 97.84, 'c': 99.23 },
        { 'x': '2004-02-02', 'o': 99.15, 'h': 99.94, 'l': 98.50, 'c': 99.39 },
        { 'x': '2004-02-03', 'o': 99.00, 'h': 99.00, 'l': 98.95, 'c': 99.00 },
        { 'x': '2004-02-04', 'o': 99.38, 'h': 99.43, 'l': 99.30, 'c': 99.19 },
        { 'x': '2004-02-05', 'o': 99.00, 'h': 99.09, 'l': 98.26, 'c': 98.86 },
        { 'x': '2004-02-06', 'o': 98.85, 'h': 99.24, 'l': 98.25, 'c': 98.94 },
        { 'x': '2004-02-09', 'o': 99.31, 'h': 99.44, 'l': 98.60, 'c': 98.95 },
        { 'x': '2004-02-10', 'o': 98.45, 'h': 99.97, 'l': 98.41, 'c': 99.61 },
        { 'x': '2004-02-11', 'o': 99.20, 'h': 99.31, 'l': 98.80, 'c': 99.96 },
        { 'x': '2004-02-12', 'o': 99.06, 'h': 99.30, 'l': 99.30, 'c': 99.30 },
        { 'x': '2004-02-13', 'o': 99.10, 'h': 99.99, 'l': 99.08, 'c': 99.71 },
        { 'x': '2004-02-17', 'o': 99.99, 'h': 99.00, 'l': 99.32, 'c': 99.37 }
    ];

    Session.set('candlestickData', data);
});

Template.Candlestick.onRendered(function() {
    var data = Session.get('candlestickData');
    
    createCandlestick(data);
});