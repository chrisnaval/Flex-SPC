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
    var dataValue = [];
    
    for(var i = 0; i < data.length; i++) {
        dataList = {
            date: data[i].createdAt,
            visits: data[i].xBarResult
        }
        dataValue.push(dataList);
    }
    return dataValue;

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
        var productId = data[0].getElementsByClassName('productName')[0].getAttribute('data-id');
        var modal = document.getElementById('configurationModal');
        var tr = document.getElementsByTagName('tr');

        for(var i = 0; i < tr.length; i++) {
            tr[i].classList.remove('selected');
        }

        var xbar = Session.get('xbar');
        var histogram = Session.get('histogram');
        var candlestick = Session.get('candlestick');
        var rLine = Session.get('rLine');
        var yield = Session.get('yield');
        var tester = Session.get('tester');
        var category = Session.get('category');

        if(histogram) {
            document.getElementById('reports-histogram').setAttribute('data-id', productId);
            document.getElementById('reports-histogram').setAttribute('data-cat', category);
        }
        if(xbar) {
            document.getElementById('reports-xbar').setAttribute('data-id', productId);
            document.getElementById('reports-xbar').setAttribute('data-cat', category);
        }
        if(candlestick) {
            document.getElementById('reports-candlestick').setAttribute('data-id', productId);
            document.getElementById('reports-candlestick').setAttribute('data-cat', category);
        }
        if(rLine) {
            document.getElementById('reports-rLine').setAttribute('data-id', productId);
            document.getElementById('reports-rLine').setAttribute('data-cat', category);
        }
        if(yield) {
            document.getElementById('reports-yield').setAttribute('data-id', productId);
            document.getElementById('reports-yield').setAttribute('data-cat', category);
        }
        if(tester) {
            document.getElementById('reports-tester').setAttribute('data-id', productId);
            document.getElementById('reports-tester').setAttribute('data-cat', category);
        }

        var xBarConfigId = document.getElementById('reports-xbar').getAttribute('data-id');
        var xBarConfigCategory = document.getElementById('reports-xbar').getAttribute('data-cat');

        if(xBarConfigId != null && xBarConfigCategory === 'sample') {
            //statement
        } else if (xBarConfigId != null && xBarConfigCategory === 'overall') {
            //statement
        }

        modal.style.display = 'none';
    },
    'click select': function() {
        Session.set('dataId','');
    },
    'change #xbar-category': function() {
        Session.keys = {}
        var element = document.getElementById('xbar-category');
        var chartCategory = element.options[element.selectedIndex].value;
        var modal = document.getElementById('configurationModal');
        Session.set('xbar', true);

        if(chartCategory === 'sample') {
            Session.set('category', 'sample');
        } else {
            Session.set('category', 'overall');
        }

        modal.style.display = 'block';
    },
    'change #histogram-Category': function() {
        Session.keys = {}
        var element = document.getElementById('histogram-Category');
        var chartCategory = element.options[element.selectedIndex].value;
        var modal = document.getElementById('configurationModal');
        Session.set('histogram', true);

        if(chartCategory === 'sample') {
            Session.set('category', 'sample');
        } else {
            Session.set('category', 'overall');
        }

        modal.style.display = 'block';
    },
    'change #candlestick-Category': function() {
        Session.keys = {}
        var element = document.getElementById('candlestick-Category');
        var chartCategory = element.options[element.selectedIndex].value;
        var modal = document.getElementById('configurationModal');
        Session.set('candlestick', true);

        if(chartCategory === 'sample') {
            Session.set('category', 'sample');
        } else {
            Session.set('category', 'overall');
        }

        modal.style.display = 'block';
    },
    'change #rLine-category': function() {
        Session.keys = {}
        var element = document.getElementById('rLine-category');
        var chartCategory = element.options[element.selectedIndex].value;
        var modal = document.getElementById('configurationModal');
        Session.set('rLine', true);

        if(chartCategory === 'sample') {
            Session.set('category', 'sample');
        } else {
            Session.set('category', 'overall');
        }

        modal.style.display = 'block';
    },
    'change #yield-category': function() {
        Session.keys = {}
        var element = document.getElementById('yield-category');
        var chartCategory = element.options[element.selectedIndex].value;
        var modal = document.getElementById('configurationModal');
        Session.set('yield', true);

        if(chartCategory === 'sample') {
            Session.set('category', 'sample');
        } else {
            Session.set('category', 'overall');
        }

        modal.style.display = 'block';
    },
    'change #tester-category': function() {
        Session.keys = {}
        var element = document.getElementById('tester-category');
        var chartCategory = element.options[element.selectedIndex].value;
        var modal = document.getElementById('configurationModal');
        Session.set('tester', true);

        if(chartCategory === 'sample') {
            Session.set('category', 'sample');
        } else {
            Session.set('category', 'overall');
        }

        modal.style.display = 'block';
    },
    'click .reports': function(event) {
        var target = event.target;
        var modal = document.getElementById('configurationModal');
        var elementId = target.getAttribute('data-id');
        var elementCategory = target.getAttribute('data-cat');

        Session.set('dataId', elementId);
        Session.set('dataCategory', elementCategory);
        modal.style.display = 'block';
    }
});