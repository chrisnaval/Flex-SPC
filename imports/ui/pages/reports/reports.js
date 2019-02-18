import './reports.html';

// Component(s)
// Tester
import '../../components/charts/tester/tester.js';
// XBar
import '../../components/charts/xbar/xbar.js';
import { createXBar } from '../../components/charts/xbar/xbar.js';

// Helpers
import { formatDataForAnyCharts } from '/lib/helpers.js';
import { setLimit } from '/lib/helpers.js';

// Meteor Package(s)
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';

// Mongo Collection(s)
import { Configurations } from '/imports/api/collections/configurations/configurations.js';
import { PerItemTestResults } from '/imports/api/collections/perItemTestResults/perItemTestResults.js';
import { PerSampleTestResults } from '/imports/api/collections/perSampleTestResults/perSampleTestResults.js';

Template.Reports.onCreated(function() {
    this.state = new ReactiveDict();
    this.state.set({
        showCharts: true,
        isConfig: false,
        isTester: false
    });

    this.autorun(function() {
        Meteor.subscribe('configurations.all');
        Meteor.subscribe('perSampleTestResults.all');
        var config = Configurations.findOne({});
        if(config) {
            Meteor.subscribe('histogram.overAll', config._id);
        }
    });
});

Template.Reports.onRendered(function() {
	
});

Template.Reports.helpers({
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
    },
    showCharts() {
        return Template.instance().state.get('showCharts');
    },
    isConfig() {
        return Template.instance().state.get('isConfig');
    },
    isTester() {
        return Template.instance().state.get('isTester');
    }
});

Template.Reports.events({
    'click #overall': function(event, instance) {
        const target = event.target;
        target.parentElement.classList.add('active');

        // Remove active class to others
        var perSample = document.getElementById('per-sample');
        var tester = document.getElementById('tester');
        var configuration = document.getElementById('configuration');

		perSample.parentElement.classList.remove('active');
        tester.parentElement.classList.remove('active');
        configuration.parentElement.classList.remove('active');

        instance.state.set({
            showCharts: true,
            isConfig: false,
            isTester: false
        });
    },
    'click #per-sample': function(event, instance) {
        const target = event.target;
        target.parentElement.classList.add('active');

        // Remove active class to others
        var overall = document.getElementById('overall');
        var tester = document.getElementById('tester');
        var configuration = document.getElementById('configuration');

		overall.parentElement.classList.remove('active');
        tester.parentElement.classList.remove('active');
        configuration.parentElement.classList.remove('active');

        instance.state.set({
            showCharts: true,
            isConfig: false,
            isTester: false
        });

        // Radio Element
        var radioElement = document.getElementsByClassName('radio');
        var radioValConfigId;
        for(var i = 0; i < radioElement.length; i++) {
            if(radioElement[i].checked) {
                radioValConfigId = radioElement[i].value;
            }
        }

        if(radioValConfigId) {
            var perSampleTestResult = PerSampleTestResults.findOne({ 'configuration._id': radioValConfigId });
            var chartData = formatDataForAnyCharts(perSampleTestResult.sampleItems);
            var xBarChartData = {
                yScale: {
                    min: perSampleTestResult.minimum,
                    max: perSampleTestResult.configuration.specLimit.upperSpecLimit
                },
                chartData: chartData,
                ucl: setLimit(chartData, perSampleTestResult.configuration.controlLimit.upperControlLimit),
                lcl: setLimit(chartData, perSampleTestResult.configuration.controlLimit.lowerControlLimit),
                usl: setLimit(chartData, perSampleTestResult.configuration.specLimit.upperSpecLimit),
                lsl: setLimit(chartData, perSampleTestResult.configuration.specLimit.lowerSpecLimit),
            };

            createXBar(xBarChartData);
        }
        // else {
        //     var perSampleTestResult = PerSampleTestResults.findOne();
        //     var chartData = formatDataForAnyCharts(perSampleTestResult.sampleItems);
        //     var xBarChartData = {
        //         yScale: {
        //             min: perSampleTestResult.minimum,
        //             max: perSampleTestResult.configuration.specLimit.upperSpecLimit
        //         },
        //         chartData: chartData,
        //         ucl: setLimit(chartData, perSampleTestResult.configuration.controlLimit.upperControlLimit),
        //         lcl: setLimit(chartData, perSampleTestResult.configuration.controlLimit.lowerControlLimit),
        //         usl: setLimit(chartData, perSampleTestResult.configuration.specLimit.upperSpecLimit),
        //         lsl: setLimit(chartData, perSampleTestResult.configuration.specLimit.lowerSpecLimit),
        //     };

        //     createXBar(xBarChartData);
        // }
    },
    'click #tester': function(event, instance) {
        const target = event.target;
        target.parentElement.classList.add('active');

        // Remove active class to others
        var overall = document.getElementById('overall');
        var perSample = document.getElementById('per-sample');
        var configuration = document.getElementById('configuration');

		overall.parentElement.classList.remove('active');
        perSample.parentElement.classList.remove('active');
        configuration.parentElement.classList.remove('active');

        instance.state.set({
            showCharts: false,
            isConfig: false,
            isTester: true
        });
    },
    'click #configuration': function(event, instance) {
        const target = event.target;
        target.parentElement.classList.add('active');

        // Remove active class to others
        var overall = document.getElementById('overall');
        var perSample = document.getElementById('per-sample');
        var tester = document.getElementById('tester');

		overall.parentElement.classList.remove('active');
        perSample.parentElement.classList.remove('active');
        tester.parentElement.classList.remove('active');

        instance.state.set({
            showCharts: false,
            isConfig: true,
            isTester: false
        });
    }
});