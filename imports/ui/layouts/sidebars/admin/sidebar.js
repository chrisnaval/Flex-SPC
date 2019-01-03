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