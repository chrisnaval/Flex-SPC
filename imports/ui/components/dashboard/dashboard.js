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
        sectionValue: null,
        section1: null,
        section2: null,
        section3: null,
        section4: null,
        section5: null,

    });
});

Template.Dashboard.helpers({
    section1() {
        return Template.instance().reactive.get('section1');
    },
    section2() {
        return Template.instance().reactive.get('section2');
    },
    section3() {
        return Template.instance().reactive.get('section3');   
    },
    section4() {
        return Template.instance().reactive.get('section4');
    },
    section5() {
        return Template.instance().reactive.get('section5');
    },
});

Template.Dashboard.events({
    'click .choose': function(event) {
        var element = event.currentTarget;
        var dataValue = element.getAttribute('data-value');
        Template.instance().reactive.set('sectionValue', dataValue);

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

        switch(alt) {
            case 'Xbar':
                instance.reactive.set('charts', alt);
                break;
            case 'Candlestick':
                instance.reactive.set('charts', alt);
                break;
            case 'Range':
                instance.reactive.set('charts', alt);
                break;
            case 'Histogram':
                instance.reactive.set('charts', alt);
                break;
            case 'Yield':
                instance.reactive.set('charts', alt);
                break;
            case 'Pareto':
                instance.reactive.set('charts', alt);
                break;
        }

        var charts = instance.reactive.get('charts');
        var section = instance.reactive.get('sectionValue');
        var sectionElement = 'choose-'+section;

        if(section === 'section1') {
            Template.instance().reactive.set('section1', charts);
        } else if(section === 'section2') {
            Template.instance().reactive.set('section2', charts);
        } else if(section === 'section3') {
            Template.instance().reactive.set('section3', charts);
        } else if(section === 'section4') {
            Template.instance().reactive.set('section4', charts);
        } else if(section === 'section5') {
            Template.instance().reactive.set('section5', charts);
        }
        
    },
});