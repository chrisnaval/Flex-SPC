import './user-list.html';
import '../../modal/delete/delete.js'

Template.User_list.onCreated(function () {
	Meteor.subscribe('users.all');
});

Template.User_list.helpers({
	users() {
		return Meteor.users.find({
			deletedAt: null,
		});
	}
});

Template.User_list.events({
	// modal toggle
	'click .remove-user'(event, temp) {
		event.preventDefault();
		var modal = document.getElementById('myModal');
		modal.style.display = 'block';
		document.getElementById('delete_id').value = this._id;
	},

	//get ID and remove the user
	'click .remove'(event, temp) {
		event.preventDefault();
		var _id = document.getElementById('delete_id').value;
		Meteor.call('userRemove', _id, function (error) {
			if (error) {
				document.getElementById('error-msg').innerHTML = error.reason;
			}
		});

		document.getElementById('delete_id').value = '';
		var modal = document.getElementById('myModal');
		modal.style.display = 'none';
	},
});