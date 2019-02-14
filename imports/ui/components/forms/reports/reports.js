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

// Mongo Collection(s)
import { Configurations } from '/imports/api/collections/configurations/configurations.js';
import { HistogramData } from '/imports/api/collections/histogramData/histogramData.js';
import { PerItemTestResults } from '/imports/api/collections/perItemTestResults/perItemTestResults.js';
import { PerSampleTestResults } from '/imports/api/collections/perSampleTestResults/perSampleTestResults.js';

//global function and variables
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
        Meteor.subscribe('configurations.all');
        Meteor.subscribe('perSampleTestResults.all');
        var config = Configurations.findOne({});
        if(config) {
            // Meteor.subscribe('histogram.overAll', config._id);
            Meteor.subscribe('histogram.perSample', config._id);
        } 
        // else if(config) {
        //     Meteor.subscribe('histogram.perSample', config._id);
        // }
        
    });
    // Histogram per sample
    // this.autorun(function() {
    //     Meteor.subscribe('configurations.all');
    //     Meteor.subscribe('perSampleTestResults.all');
    //     var config = Configurations.findOne({});
    //     if(config) {
    //         Meteor.subscribe('histogram.overAll', config._id);
    //     }
    // });
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

        for(var i = 0; i < element.length; i++) {
            element[i].classList.remove('active');
        }

        event.target.parentElement.classList.add('active');
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
        
        if(radioValueId) {
            var chartValue = PerSampleTestResults.find({
                'configuration._id': {
                    $eq: radioValueId
                }
            }).fetch();

            Session.set('chartDatas', formatData(chartValue));
        } else {
            var chartValue = PerSampleTestResults.findOne({});
            Session.set('chartDatas', formatData(chartValue));
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