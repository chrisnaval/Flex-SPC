import './users.html';
import '../../modals/modals.js'
import { UserProfiles } from '/imports/api/collections/users/userProfiles.js';

Template.Users_list.onCreated(function () {
	Meteor.subscribe('usersProfile.all');
});

Template.Users_list.helpers({
	users() {
		return UserProfiles.find({
			deletedAt: null,
		});
	}
});

Template.Users_list.events({
	'click .remove-user'(event) {
		event.preventDefault();
		var modal = document.getElementById('myModal');
		modal.style.display = 'block';
		document.getElementById('delete_id').value = this._id;
	},
	'click .remove'(event) {
		event.preventDefault();
		var _id = document.getElementById('delete_id').value;
		document.getElementById('delete_id').value = '';
		var modal = document.getElementById('myModal');
		modal.style.display = 'none';
	},
});