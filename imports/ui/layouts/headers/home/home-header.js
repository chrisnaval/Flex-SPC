// Meteor Package(s)
import { Template } from 'meteor/templating';

// Import(s)
import './home-header.html';

Template.Home_header.events({
  'click #logout': function(event, template) {
    event.preventDefault();
		Meteor.logout(function(err){});
    FlowRouter.go('/login');
  }
});