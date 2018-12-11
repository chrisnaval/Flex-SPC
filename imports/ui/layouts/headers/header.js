// Meteor Package(s)
import { Template } from 'meteor/templating';

import './header.html';

Template.Header.events({
  'click #logout': function(event) {
    event.preventDefault();
    
		Meteor.logout();
    FlowRouter.go('/login');
  }
});