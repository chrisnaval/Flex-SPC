import './dashboard.html';

// Component(s)
import '../../components/charts/candlestick/candlestick.js';
import '../../components/charts/histogram/histogram.js';
import '../../components/charts/pareto/pareto.js';
import '../../components/charts/range/range.js';
import '../../components/charts/xbar/xbar.js';
import '../../components/charts/yield/yield.js';
import '../../components/modals/modals.js';
import '../alert-message/alert-message.js'

Template.Dashboard.onCreated(function() {
    this.reactive = new ReactiveDict();

    this.reactive.set({
        graphSection: null,
        chart1: null,
        chart2: null,
        chart3: null,
        chart4: null,
        chart5: null,
    });
});

Template.Dashboard.helpers({
    chartData1() {
        var chartData = Template.instance().reactive.get('chart1');
        return chartData;
    },
    chartData2() {
        var chartData = Template.instance().reactive.get('chart2');
        return chartData;
    },
    chartData3() {
        var chartData = Template.instance().reactive.get('chart3');
        return chartData;
    },
    chartData4() {
        var chartData = Template.instance().reactive.get('chart4');
        return chartData;
    },
    chartData5() {
        var chartData = Template.instance().reactive.get('chart5');
        return chartData;
    },
    validateChart(name, chartData) {
        if(name === chartData.chartName) {
            return true;
        }
    },
    equal(chartData, section) {
        if(chartData) {
            if(chartData.section === section) {
                return true;
            }
        }
    }
});

Template.Dashboard.events({
    'click .choose': function(event) {
        var element = event.currentTarget;
        var dataValue = element.getAttribute('data-value');
        Template.instance().reactive.set('graphSection', dataValue);

        var modal = document.getElementById('formModal');
        modal.style.display = 'block';
    },
    'click .image-content': function(event) {
        var img = document.getElementsByClassName('image-content');
        
        for(var i = 0; i < img.length; i++) {
            img[i].classList.remove('selected');
        }

        const target = event.target.closest('.image-content');
        target.classList.add('selected');
    },
    'click #removeGraph': function() {
        Session.set('charts', null); 
    },
    'click .select-graph': function(event) {
        event.preventDefault();
        var instance = Template.instance();

        var data = document.getElementsByClassName("selected");
        var alt = data[0].getElementsByClassName("sm-img")[0].getAttribute("alt");
        var img = document.getElementsByClassName('image-content');
        var modal = document.getElementById('formModal');
        modal.style.display = "none";

        for(var i = 0; i < img.length; i++) {
            img[i].classList.remove('selected');
        }
        var graphSection = instance.reactive.get('graphSection');

        dataChart = {
            chartName: alt,
            section: graphSection
        }
        
        if(graphSection === 'chart1') {
            instance.reactive.set('chart1', dataChart);
        } else if(graphSection === 'chart2') {
            instance.reactive.set('chart2', dataChart);
        } else if(graphSection === 'chart3') {
            instance.reactive.set('chart3', dataChart);
        } else if(graphSection === 'chart4') {
            instance.reactive.set('chart4', dataChart);
        } else if(graphSection === 'chart5') {
            instance.reactive.set('chart5', dataChart);
        }

        document.getElementById(graphSection).style.display = 'none';
    },
    'click #save-custom': function(event) {
        var modal = document.getElementById('confirmDash');
        modal.style.display = 'block';
    },
    'click #removeGraph':function(event) {
        event.preventDefault();
        var instance = Template.instance();
        var graphValue = event.currentTarget.getAttribute('data-value');

        if(graphValue === 'chart1') {
            instance.reactive.set('chart1', null);
        } else if(graphValue === 'chart2') {
            instance.reactive.set('chart2', null);
        } else if(graphValue === 'chart3') {
            instance.reactive.set('chart3', null);
        } else if(graphValue === 'chart4') {
            instance.reactive.set('chart4', null);
        } else if(graphValue === 'chart5') {
            instance.reactive.set('chart5', null);
        }
    }
});