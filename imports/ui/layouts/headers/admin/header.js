import './header.html';

Template.Admin_header.events({
    'click #logout': function(event) {
        event.preventDefault();

        Meteor.logout();
        FlowRouter.go('/login');
    }
});