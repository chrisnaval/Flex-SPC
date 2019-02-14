import './range.html';

/*
 * Creates R Line Chart
 * @param data
*/
function createRline(data) {
    var rLinechart = AmCharts.makeChart("Rlinechart", {
        "type": "serial",
        "theme": "light",
        "marginRight": 80,
        "autoMarginOffset": 20,
        "marginTop": 7,
        "pathToImages": "http://www.amcharts.com/lib/3/images/",
        "dataProvider": data,
        "valueAxes": [{
            "axisAlpha": 0.2,
            "dashLength": 1,
            "position": "left"
        }],
        "mouseWheelZoomEnabled": true,
        "valueAxes": [{
            "logarithmic": true,
            "guides": [{
                "lineColor": "#FFCC00",
                "inside": true,
                "lineAlpha": 1,
                "value": 1300,
                "toValue": 1200
            }],
        }],
        "graphs": [{
            "id": "g1",
            "balloonText": "[[value]]",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "hideBulletsCount": 50,
            "title": "red line",
            "valueField": "visits",
            "useLineColorForBulletBorder": true,
            "balloon": {
                "drop": true
            }
        }],
        "guides": [
            {
                "fillAlpha": 0.10,
                "value": 0,
                "toValue": 10
            }
        ],
        "chartScrollbar": {
            "autoGridCount": true,
            "graph": "g1",
            "scrollbarHeight": 40
        },
        "chartCursor": {
            "limitToGraph": "g1"
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "axisColor": "#DADADA",
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true
        }
    });

    rLinechart.addListener('rendered', zoomChart);
    zoomChart();
    function zoomChart() {
        rLinechart.zoomToIndexes(data.length - 40, data.length - 1);
    }
}

Template.Range.onCreated(function() {
        var chartData = [];
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 5);
    
        var visits = 1200;
        for(var i = 0; i < 1000; i++) {
            var newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);
            visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            chartData.push({
                date: newDate,
                visits: visits
            });
        }

        Session.set('chartData', chartData);
});

Template.Range.helpers({

});

Template.Range.onRendered(function () {
    var chartData = Session.get('chartData')
    createRline(chartData);
});

Template.Range.events({

});