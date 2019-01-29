import './sidebar.html';

// Template Helpers
Template.Sidebar.helpers({
    currentUser() {
        return Meteor.user();
    }
});

// Template Events
Template.Sidebar.events({
    'click #logout-user': function(event) {
        event.preventDefault();
        
        Meteor.logout(function(error) {
	        if(error) {
	            throw new Meteor.Error("Log out failed!");
	        } else {
	        	FlowRouter.go('/login');
	        }
    	});
    },
    'click #change-pass': function(event) {
        event.preventDefault();

        var modal = document.getElementById('change-password');
		modal.style.display = 'block';
    }
});