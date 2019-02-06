import './reports.html'

// Component(s)
import '../../charts/candlestick/candlestick.js';
import '../../charts/histogram/histogram.js';
import '../../charts/pareto/pareto.js';
import '../../charts/range/range.js';
import '../../charts/xbar/xbar.js';
import '../../charts/yield/yield.js';
import '../../charts/test/test.js';
import '../../modals/modals.js';
import '../../alert-message/alert-message.js';

//Meteor Packages
import { Session } from 'meteor/session';

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
        var tr = document.getElementsByTagName('tr');
        var xbar = Session.get('xbar');
        var histogram = Session.get('histogram');

        if(histogram) {
            document.getElementById('histogram-chart').value = productName +' = '+ sampleSize;
        } else if(xbar) {
            document.getElementById('xbar-chart').value = productName +' = '+ sampleSize;
        } else if(candlestick) {
            document.getElementById('candlestick-chart').value = productName +' = '+ sampleSize;
        }

        for(var i = 0; i < tr.length; i++) {
            tr[i].classList.remove('selected');
         }

        var modal = document.getElementById('configurationModal');
        modal.style.display = 'none';
    }
});