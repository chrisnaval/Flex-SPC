import './sidebar.html';

// Component(s)
import '../../../components/modals/modals.js';


// Template Helpers
Template.Admin_sidebar.helpers({
    currentAdmin() {
        return Meteor.user();
    }
});

// Template Events
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
    },
    'click #change-pass': function(event) {
        event.preventDefault();

        var modal = document.getElementById('change-password');
		modal.style.display = 'block';
    },
    'click a': function() {
        Session.keys = {}
    }
});