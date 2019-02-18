import './tester.html';

//collections
import { Parameters } from '/imports/api/collections/parameters/parameters.js';
import { Testers } from '/imports/api/collections/testers/testers.js';

//oncreated
Template.TesterChart.onCreated(function() {
    this.autorun(function() {
        Meteor.subscribe('parameters.all', function() {
            Session.set('parameters', Parameters.find({}).fetch());
        });

        Meteor.subscribe('testers.all', function() {
            Session.set('testers', Testers.find({}).fetch());
        });
    });
});

//onrendered
Template.TesterChart.onRendered(function() {
    
});

//helpers
Template.TesterChart.helpers({
    parameters() {
        return Session.get('parameters');
    },
    testers() {
        return Session.get('testers');
    }
});

//events
Template.TesterChart.events({
    
});