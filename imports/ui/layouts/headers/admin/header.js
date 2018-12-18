import './header.html';

Template.Admin_header.events({
    'click #logout'(event) {
        event.preventDefault();

        Meteor.logout();
        FlowRouter.go('/login');
    }
});