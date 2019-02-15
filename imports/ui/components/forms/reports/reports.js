import './reports.html'

// Component(s)
import '../../charts/candlestick/candlestick.js';
import '../../charts/histogram/histogram.js';
import '../../charts/pareto/pareto.js';
import '../../charts/range/range.js';
import '../../charts/xbar/xbar.js';
import '../../charts/yield/yield.js';
import '../../charts/tester/tester.js';
import '../../modals/modals.js';
import '../../alert-message/alert-message.js';
import { calculateOverallItems } from '/lib/overall-calculator.js';
import { calculateHistogramOverallItems } from '/lib/overall-calculator.js';


// Mongo Collection(s)
import { Configurations } from '/imports/api/collections/configurations/configurations.js';
import { HistogramData } from '/imports/api/collections/histogramData/histogramData.js';
import { PerItemTestResults } from '/imports/api/collections/perItemTestResults/perItemTestResults.js';
import { PerSampleTestResults } from '/imports/api/collections/perSampleTestResults/perSampleTestResults.js';

//global function and variables

// Histogram per-sample format
function histogramFormat(data) {
    var dataValue = [];

    for(var i = 0; i < data.length; i++) {
        dataList = [
            data[i].binRange.minimum + '-' + data[i].binRange.maximum,
            data[i].binCount
        ];
        dataValue.push(dataList);
    }
    return dataValue;
}

// Xbar and Rchart per-item data format
function formatDataPerItem(data) {
    var dataValue = [];

    for(var i = 0; i < data.length; i++) {
        dataList = {
            date: data[i].dataResultCreatedAt,
            visits: data[i].measurement
        }
        dataValue.push(dataList);
    }
    return dataValue;
}

// Xbar and Rchart per-sample data format
function formatData(data) {
    var dataValue = [];
    
    for(var i = 0; i < data.length; i++) {
        var sampleItems = data[i].sampleItems;
        for(var s = 0; s < sampleItems.length; s++) {
             dataList = {
                date: sampleItems[s].dataResultCreatedAt,
                visits: sampleItems[s].measurement
            }
            dataValue.push(dataList);
        }
    }
    return dataValue;
}

Template.Reports_create.onCreated(function() {
    // Histrogram over all and per sample
    this.autorun(function() {
        // Per-sample subscription
        Meteor.subscribe('configurations.all');
        Meteor.subscribe('histogramData.overall');
        Meteor.subscribe('perSampleTestResults.all');

        // Per-item subscription
        Meteor.subscribe('perItemTestResults.overall');
        var config = Configurations.findOne({});
        if(config) {
            Meteor.subscribe('histogram.overAll', config._id);
            Meteor.subscribe('histogram.perSample', config._id);
        }
        
    });
});

Template.Reports_create.onRendered(function() {
    
});

Template.Reports_create.helpers({
    configurations() {
        return Configurations.find({}).fetch();
    },
    first(id) {
        var firstItem = Configurations.findOne({});
        if(firstItem) {
            var firstItemId = firstItem._id;
            if(firstItemId === id) {
                return true;
            } else {
                return false;
            }
        }
    }
});

Template.Reports_create.events({
    'click #overall': function(event) {
        document.getElementById('template-1').style.display = 'block';
        document.getElementById('template-2').style.display = 'none';
        document.getElementById('template-3').style.display = 'none';
        var element = document.getElementsByClassName('semi-nav-list');
        var radioElement = document.getElementsByClassName('radio');
        var radioValueId;

        for(var i = 0; i < element.length; i++) {
            element[i].classList.remove('active');
        }

        for(var i = 0; i < radioElement.length; i++) {
            if(radioElement[i].checked) {
                radioValueId = radioElement[i].value;
            }
        }
        
        var configuration = Configurations.findOne({ _id: radioValueId });
        if(radioValueId) {
            // Xbar per-item
            var xBarDataResults = calculateOverallItems(configuration);
            Session.set('xBArPerItem', formatDataPerItem(xBarDataResults.items));
            
            // Rchart per-item     
            var rChartDataResults = calculateOverallItems(configuration);       
            Session.set('rChartPerItem', formatDataPerItem(rChartDataResults.items));

            // Histogram per-item
            Session.set('histogramPerItem', calculateHistogramOverallItems(configuration));
            
        } else {
            // XBar per-item
            var xBarPerSample = PerItemTestResults.findOne({});
            Session.set('xBarPerSample', formatData(xBarPerSample));

            // RChart per-item
            var rChartPerItem = PerItemTestResults.findOne({});
            Session.set('rChartPerItem', formatData(rChartPerItem));

            // Histogram per-item
            var histogramPerItem = PerItemTestResults.findOne({});
            Session.set('histogramPerItem', calculateHistogramOverallItems(histogramPerItem));
        }

    },
    'click #per-sample': function(event) {
        var target = event.target;
        document.getElementById('template-1').style.display = 'block';
        document.getElementById('template-2').style.display = 'none';
        document.getElementById('template-3').style.display = 'none';
        var element = document.getElementsByClassName('semi-nav-list');
        var radioElement = document.getElementsByClassName('radio');
        var radioValueId;

        for(var i = 0; i < element.length; i++) {
            element[i].classList.remove('active');
        }
        target.parentElement.classList.add('active');
        
        for(var i = 0; i < radioElement.length; i++) {
            if(radioElement[i].checked) {
                radioValueId = radioElement[i].value;
            }
        }
        
        var configuration = Configurations.findOne({ _id: radioValueId });
        if(radioValueId) {
            var chartValue = PerSampleTestResults.find({
                'configuration._id': {
                    $eq: radioValueId
                }
            }).fetch();

            Session.set('chartDatas', formatData(chartValue));

            // Xbar per-sample
            var xBarPerSample = PerSampleTestResults.find({
                'sampleItems': {
                    $elemMatch: {
                        'product.name': configuration.product.name,
                        'testResults': {
                            $elemMatch: {
                                'tester.name': configuration.tester.name,
                                'parameter.name': configuration.parameter.name
                            }
                        }
                    }
                }
            }).fetch();
            
            Session.set('xBarPerSample', formatData(xBarPerSample));

            // Rchart per-sample
            var rChartPerSample = PerSampleTestResults.find({
                'sampleItems': {
                    $elemMatch: {
                        'product.name': configuration.product.name,
                        'testResults': {
                            $elemMatch: {
                                'tester.name': configuration.tester.name,
                                'parameter.name': configuration.parameter.name
                            }
                        }
                    }
                }
            }).fetch();
            
            Session.set('rChartPerSample', formatData(rChartPerSample));

            // Histogram per-sample
            var histogramPerSample = HistogramData.find({
                'sampleItem.product.name': configuration.product.name,
                'sampleItem.testResults': {
                    $elemMatch: {
                        'tester.name': configuration.tester.name,
                        'parameter.name': configuration.parameter.name
                    }
                }
            }).fetch();
            
            Session.set('histogramPerSample', histogramFormat(histogramPerSample));
            

        } else {
            var chartValue = PerSampleTestResults.findOne({});
            Session.set('chartDatas', formatData(chartValue));

            // xBar per-sample
            var xBarPerSample = PerSampleTestResults.findOne({});
            Session.set('xBarPerSample', formatData(xBarPerSample));

            // Rchart per-sample
            var rChartPerSample = PerSampleTestResults.findOne({});
            Session.set('rChartPerSample', formatData(rChartPerSample));

            // Histogram per-sample
            var histogramPerSample = PerSampleTestResults.findOne({});
            Session.set('histogramPerSample', formatData(histogramPerSample));
        }
    },
    'click #configuration': function(event) {
        var target = event.target;
        document.getElementById('template-1').style.display = 'none';
        document.getElementById('template-2').style.display = 'none';
        document.getElementById('template-3').style.display = 'block';
        var element = document.getElementsByClassName('semi-nav-list');

        for(var i = 0; i < element.length; i++) {
            element[i].classList.remove('active');
        }

        target.parentElement.classList.add('active');
    },
    'click #tester': function(event) {
        var target = event.target;
        document.getElementById('template-1').style.display = 'none';
        document.getElementById('template-3').style.display = 'none';
        document.getElementById('template-2').style.display = 'block';
        var element = document.getElementsByClassName('semi-nav-list');

        for(var i = 0; i < element.length; i++) {
            element[i].classList.remove('active');
        }

        target.parentElement.classList.add('active');
    }
});