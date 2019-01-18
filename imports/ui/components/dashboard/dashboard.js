import './dashboard.html';

//packages
import { Session } from 'meteor/session'

// Component(s)
import '../../components/charts/candlestick/candlestick.js';
import '../../components/charts/histogram/histogram.js';
import '../../components/charts/pareto/pareto.js';
import '../../components/charts/range/range.js';
import '../../components/charts/xbar/xbar.js';
import '../../components/charts/yield/yield.js';
import '../../components/modals/modals.js';
import '../alert-message/alert-message.js'

Template.Dashboard.helpers({
    chart() {
        return Session.get('charts');
    },
    remove() {
        return Session.get('remove');
    }
});

Template.Dashboard.events({
    'click .choose': function() {
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
        Session.set('remove', false);
        var choose= document.getElementById('choose');
        choose.style.display = "block";
    },
    'click .select-graph': function(event) {
        event.preventDefault();
        var data = document.getElementsByClassName("selected");
        var alt = data[0].getElementsByClassName("sm-img")[0].getAttribute("alt");
        var img = document.getElementsByClassName('image-content');
        var modal = document.getElementById('formModal');
        modal.style.display = "none";

        for(var i = 0; i < img.length; i++) {
            img[i].classList.remove('selected');
        }

        switch(alt) {
            case 'Xbar':
                Session.set('charts', alt); 
                Session.set('remove', true);
                break;
            case 'Candlestick':
                Session.set('charts', alt);
                Session.set('remove', true);
                break;
            case 'Range':
                Session.set('charts', alt);
                Session.set('remove', true);
                break;
            case 'Histogram':
                Session.set('charts', alt);
                Session.set('remove', true);
                break;
            case 'Yield':
                Session.set('charts', alt);
                Session.set('remove', true);
                break;
            case 'Pareto':
                Session.set('charts', alt);
                Session.set('remove', true);
                break;
        }
        
        var choose = document.getElementById('choose');
        choose.style.display = "none";
    },
});