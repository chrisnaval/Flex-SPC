import './users.html';
import '../../modals/modals.js'

Template.Users_list.onCreated(function () {
	Meteor.subscribe('users.all');
});

Template.Users_list.helpers({
	users() {
		return Meteor.users.find({
			'profile.role.role': { 
				$ne: "Super Administrator" 
			},
			deletedAt: null,
		});
	}
});

Template.Users_list.events({
	'click .remove-user': function(event) {
		event.preventDefault();
		var modal = document.getElementById('myModal');
		modal.style.display = 'block';
		document.getElementById('delete_id').value = this._id;
	},
	'click .remove': function(event) {
		event.preventDefault();
		var _id = document.getElementById('delete_id').value;
		document.getElementById('delete_id').value = '';
		var modal = document.getElementById('myModal');
		modal.style.display = 'none';
	},
});