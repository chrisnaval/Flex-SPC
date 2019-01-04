import './sidebar.html';

Template.Admin_sidebar.onCreated(function() {
    var currentRoutePath = FlowRouter.current().route.path;
});

// Helpers
Template.Admin_sidebar.helpers({
    currentAdmin() {
        return Meteor.user();
    }
});

// Events
Template.Admin_sidebar.events({
    'click #logout-admin': function(event) {
        event.preventDefault();
        
        Meteor.logout(function(error) {
	        if(error) {
	            throw new Meteor.Error("Log out failed!");
	        } else {
	        	FlowRouter.go('/login');
	        }
    	});
    },
    'click .menu-item': function(event) {
        var elements = document.querySelector('.active');

        if(elements !== null) {
            elements.classList.remove('active');
            elements.classList.add('inactive');
        }

        event.target.parentElement.classList.add('active');
    }
});