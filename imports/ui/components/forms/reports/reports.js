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
import { PerItemTestResults } from '/imports/api/collections/perItemTestResults/perItemTestResults.js';
import { PerSampleTestResults } from '/imports/api/collections/perSampleTestResults/perSampleTestResults.js';

//global function and variables
function formatData(data) {
    
}

Template.Reports_create.onCreated(function() {

    var xBarVariable = Session.get('xBarData');
    var rLineVariable = Session.get('rLineData');

    if(xBarVariable === undefined || xBarVariable === null ) {
        // Autorun
        this.autorun(function() {
            Meteor.subscribe('perItemTestResults.all', function() {
                Session.set('xBarData', PerItemTestResults.find({}).fetch());
            });
        });
    }
    
    if(rLineVariable === undefined || rLineVariable === null) {
        // Autorun
        this.autorun(function() {
            Meteor.subscribe('perItemTestResults.all', function() {
                Session.set('rLineData', PerItemTestResults.find({}).fetch());
            });
        });
    }
    
    this.autorun(function() {
        Meteor.subscribe('perSampleTestResults.all');
    });
});

Template.Reports_create.helpers({

});

Template.Reports_create.events({
    'click .choose-histogram': function(event) {
        Session.keys = {}
        event.preventDefault();
        var modal = document.getElementById('configurationModal');
        modal.style.display = 'block';
        Session.set('histogram', true);
    },
    'click .choose-Xbar': function(event) {
        Session.keys = {}
        event.preventDefault();
        var modal = document.getElementById('configurationModal');
        modal.style.display = 'block';
        Session.set('xbar', true);
    },
    'click .choose-candlestick': function(event) {
        Session.keys = {}
        event.preventDefault();
        var modal = document.getElementById('configurationModal');
        modal.style.display = 'block';
        Session.set('candlestick', true);
    },
    'click .choose-rLine': function(event) {
        Session.keys = {}
        event.preventDefault();
        var modal = document.getElementById('configurationModal');
        modal.style.display = 'block';
        Session.set('rLine', true);
    },
    'click .choose-yield': function(event) {
        Session.keys = {}
        event.preventDefault();
        var modal = document.getElementById('configurationModal');
        modal.style.display = 'block';
        Session.set('yield', true);
    },
    'click .choose-tester': function(event) {
        Session.keys = {}
        event.preventDefault();
        var modal = document.getElementById('configurationModal');
        modal.style.display = 'block';
        Session.set('tester', true);
    },
    'click tr': function(event) {
        event.preventDefault();
        var tr = document.getElementsByTagName('tr');

        for(var i = 0; i < tr.length; i++) {
            tr[i].classList.remove('selected');
         }

        const target = event.target.closest('tr');
        target.classList.add('selected');
    },
    'click .select-configuration': function() {
        event.preventDefault();
        var data = document.getElementsByClassName('selected');
        var productName = data[0].getElementsByClassName('productName')[0].innerText;
        var sampleSize = data[0].getElementsByClassName('sampleSize')[0].innerText;
        var modal = document.getElementById('configurationModal');
        var tr = document.getElementsByTagName('tr');

        var xbar = Session.get('xbar');
        var histogram = Session.get('histogram');
        var candlestick = Session.get('candlestick');
        var rLine = Session.get('rLine');
        var yield = Session.get('yield');
        var tester = Session.get('tester');

        if(histogram) {
            document.getElementById('histogram-chart').value = productName +' = '+ sampleSize;
        } else if(xbar) {
            document.getElementById('xbar-chart').value = productName +' = '+ sampleSize;
        } else if(candlestick) {
            document.getElementById('candlestick-chart').value = productName +' = '+ sampleSize;
        } else if(rLine) {
            document.getElementById('rLine-chart').value = productName +' = '+ sampleSize;
        } else if(yield) {
            document.getElementById('yield-chart').value = productName +' = '+ sampleSize;
        } else if(tester) {
            document.getElementById('tester-chart').value = productName +' = '+ sampleSize;
        }

        for(var i = 0; i < tr.length; i++) {
            tr[i].classList.remove('selected');
         }

        var xbarValue = document.getElementById('xbar-chart').value;
        var rLineValue = document.getElementById('rLine-chart').value;

        if(xbarValue) {
            Session.set('xBarData', PerSampleTestResults.find({}).fetch());
        }
        if (rLineValue) {
            Session.set('rLineData', PerSampleTestResults.find({}).fetch());
        }

        modal.style.display = 'none';
    },
    'change #xbar-category': function() {
        var element = document.getElementById('xbar-category');
        var chartCategory = element.options[element.selectedIndex].value;

        if(chartCategory === 'sample') {
            document.getElementById('xbar-div').style.display = 'block';
        } else {
            document.getElementById('xbar-div').style.display = 'none';
            document.getElementById('xbar-chart').value = '';
            Session.set('xBarData', PerItemTestResults.find({}).fetch());
        }
    },
    'change #histogram-Category': function() {
        var element = document.getElementById('histogram-Category');
        var chartCategory = element.options[element.selectedIndex].value;
        if(chartCategory === 'sample') {
            document.getElementById('histogram-div').style.display = 'block';
        } else {
            document.getElementById('histogram-div').style.display = 'none';
        }
    },
    'change #candlestick-Category': function() {
        var element = document.getElementById('candlestick-Category');
        var chartCategory = element.options[element.selectedIndex].value;
        if(chartCategory === 'sample') {
            document.getElementById('candlestick-div').style.display = 'block';
        } else {
            document.getElementById('candlestick-div').style.display = 'none';
        }
    },
    'change #rLine-category': function() {
        var element = document.getElementById('rLine-category');
        var chartCategory = element.options[element.selectedIndex].value;
        if(chartCategory === 'sample') {
            document.getElementById('rLine-div').style.display = 'block';
        } else {
            document.getElementById('rLine-div').style.display = 'none';
            document.getElementById('rLine-chart').value = '';
            Session.set('rLineData', PerItemTestResults.find({}).fetch());
        }
    },
    'change #yield-category': function() {
        var element = document.getElementById('yield-category');
        var chartCategory = element.options[element.selectedIndex].value;
        if(chartCategory === 'sample') {
            document.getElementById('yield-div').style.display = 'block';
        } else {
            document.getElementById('yield-div').style.display = 'none';
            document.getElementById('yield-chart').value = '';
        }
    },
    'change #tester-category': function() {
        var element = document.getElementById('tester-category');
        var chartCategory = element.options[element.selectedIndex].value;
        if(chartCategory === 'sample') {
            document.getElementById('tester-div').style.display = 'block';
        } else {
            document.getElementById('tester-div').style.display = 'none';
            document.getElementById('tester-chart').value = '';
        }
    }
});