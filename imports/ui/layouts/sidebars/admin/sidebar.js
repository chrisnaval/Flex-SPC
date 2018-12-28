import './sidebar.html';

// Helpers
Template.Admin_sidebar.helpers({
    currentAdmin() {
        return Meteor.user();
    }
});

// Events
Template.Admin_sidebar.events({
    'click #logout': function() {
        Meteor.logout();
		FlowRouter.go('/login');
    }
});