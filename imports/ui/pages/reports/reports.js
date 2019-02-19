import './reports.html';

// Component(s)
// Tester
import '../../components/charts/tester/tester.js';
// X-bar
import '../../components/charts/xbar/xbar.js';
import { createXBar } from '../../components/charts/xbar/xbar.js';
// Yield
import '../../components/charts/yield/yield.js';
import { createYield } from '../../components/charts/yield/yield.js';

// Helpers
import { formatDataForAnyCharts } from '/lib/helpers.js';
import { setLimit } from '/lib/helpers.js';

// Meteor Package(s)
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

// Mongo Collection(s)
import { Configurations } from '/imports/api/collections/configurations/configurations.js';
import { PerSampleTestResults } from '/imports/api/collections/perSampleTestResults/perSampleTestResults.js';

// Overall Items
import { calculateOverallItems } from '/lib/overall-calculator.js';

Template.Reports.onCreated(function() {
    this.state = new ReactiveDict();
    this.state.set({
        showCharts: true,
        isConfig: false,
        isTester: false
    });

    this.autorun(function() {
        Meteor.subscribe('configurations.all', function() {
            Session.set('configuration', Configurations.findOne());
        });
        Meteor.subscribe('perItemTestResults.all');
        Meteor.subscribe('perSampleTestResults.all');
    });
});

Template.Reports.onRendered(function() {
	// 
});

Template.Reports.helpers({
    configurations() {
        return Configurations.find({}).fetch();
    },
    first(id) {
        var firstItem = Configurations.findOne();
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

        // Radio Element
        var radioElement = document.getElementsByClassName('radio');
        var radioValConfigId;
        for(var i = 0; i < radioElement.length; i++) {
            if(radioElement[i].checked) {
                radioValConfigId = radioElement[i].value;
            }
        }

        var xBarChartData = {};
        var yieldChartData = {};
        if(radioValConfigId) {
            var configuration = Configurations.findOne({ _id: radioValConfigId });
            var overallItems = calculateOverallItems(configuration);
            var chartData = formatDataForAnyCharts(overallItems.items);
            xBarChartData = {
                yScale: {
                    min: overallItems.minimum,
                    max: configuration.specLimit.upperSpecLimit
                },
                chartData: chartData,
                ucl: setLimit(chartData, configuration.controlLimit.upperControlLimit),
                lcl: setLimit(chartData, configuration.controlLimit.lowerControlLimit),
                usl: setLimit(chartData, configuration.specLimit.upperSpecLimit),
                lsl: setLimit(chartData, configuration.specLimit.lowerSpecLimit),
            };
        } else {
            var configuration = Session.get('configuration');
            var overallItems = calculateOverallItems(configuration);
            var chartData = formatDataForAnyCharts(overallItems.items);
            xBarChartData = {
                yScale: {
                    min: overallItems.minimum,
                    max: configuration.specLimit.upperSpecLimit
                },
                chartData: chartData,
                ucl: setLimit(chartData, configuration.controlLimit.upperControlLimit),
                lcl: setLimit(chartData, configuration.controlLimit.lowerControlLimit),
                usl: setLimit(chartData, configuration.specLimit.upperSpecLimit),
                lsl: setLimit(chartData, configuration.specLimit.lowerSpecLimit),
            };
        }

        createXBar(xBarChartData, "overall");
        createYield(xBarChartData, "overall");
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

        var xBarChartData = {};
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
        }
        else {
            var configuration = Session.get('configuration');
            var perSampleTestResult = PerSampleTestResults.findOne({ 'configuration._id': configuration._id });
            var chartData = formatDataForAnyCharts(perSampleTestResult.sampleItems);
            xBarChartData = {
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
        }

        createXBar(xBarChartData, "per sample");
        createYield(xBarChartData, "per sample");
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