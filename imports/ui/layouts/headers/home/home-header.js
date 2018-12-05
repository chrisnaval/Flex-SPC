// Meteor Package(s)
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

// Import(s)
import './home-header.html';

Template.Home_header.events({
  "click #logout": function(event) {
    event.preventDefault();
    console.log('logging out'); 
		Meteor.logout(function(err){ 
			console.log(err);
		});
  }
});