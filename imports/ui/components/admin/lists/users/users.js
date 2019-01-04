import './users.html';
import '../../../modals/modals.js';

Template.Users_list.onCreated(function() {
	this.autorun(function() {
		Meteor.subscribe('users.all', function() {
			var currentUser = Meteor.user();
			
			if(currentUser && currentUser.profile.role.role == "Super Administrator") {
				Session.set('usersList', Meteor.users.find({
					'profile.role.role': { 
						$ne: "Super Administrator" 
					},
					'profile.deletedAt': { 
						$eq: null
					},
					deletedAt: null,
				}).fetch());
			}
        });
	});
});

Template.Users_list.onRendered(function() {
	this.autorun(function() {
		Meteor.subscribe('users.all', function() {
            var currentUser = Meteor.user();
			
			if(currentUser && currentUser.profile.role.role == "Super Administrator") {
				Session.set('usersList', Meteor.users.find({
					'profile.role.role': { 
						$ne: "Super Administrator" 
					},
					'profile.deletedAt': { 
						$eq: null
					},
					deletedAt: null,
				}).fetch());
			}
        });
	});
});

Template.Users_list.helpers({
	isSuperAdmin() {
		var user = Meteor.user();
		
		if(user && user.profile.role.role == "Super Administrator") {
			return user.profile.role.role;
		} else {
			var viewUsers = document.getElementById('view-users');
			
			if(viewUsers) {
				viewUsers.parentElement.classList.add('active');
			}

			// Retrieves all users with type "User" except "Super Administrator" - is set on Session variable
			Session.set('usersList', Meteor.users.find({
				'profile.type': { 
					$eq: "User" 
				},
				'profile.role.role': { 
					$ne: "Super Administrator" 
				},
				'profile.deletedAt': { 
					$eq: null
				},
				deletedAt: null,
			}).fetch());
		}
	},
	users() {
		return Session.get('usersList');
	},
});

Template.Users_list.events({
	'click #view-all': function(event) {
		event.target.parentElement.classList.add('active');

		var viewAdmins = document.getElementById('view-admins');
		var viewUsers = document.getElementById('view-users');
		
		viewAdmins.parentElement.classList.remove('active');
		viewUsers.parentElement.classList.remove('active');

		// Retrieves all users except "Super Administrator" - is set on Session variable
		Session.set('usersList', Meteor.users.find({
			'profile.role.role': { 
				$ne: "Super Administrator" 
			},
			'profile.deletedAt': { 
				$eq: null
			},
			deletedAt: null,
		}).fetch());
	},
	'click #view-admins': function(event) {
		event.target.parentElement.classList.add('active');
		
		var viewAll = document.getElementById('view-all');
		var viewUsers = document.getElementById('view-users');
		
		viewAll.parentElement.classList.remove('active');
		viewUsers.parentElement.classList.remove('active');

		// Retrieves all users with type "Admin" except "Super Administrator" - is set on Session variable
		Session.set('usersList', Meteor.users.find({
			'profile.type': { 
				$eq: "Admin" 
			},
			'profile.role.role': { 
				$ne: "Super Administrator" 
			},
			'profile.deletedAt': { 
				$eq: null
			},
			deletedAt: null,
		}).fetch());
	},
	'click #view-users': function(event) {
		event.target.parentElement.classList.add('active');

		var viewAll = document.getElementById('view-all');
		var viewAdmins = document.getElementById('view-admins');
		
		viewAll.parentElement.classList.remove('active');
		viewAdmins.parentElement.classList.remove('active');

		// Retrieves all users with type "User" except "Super Administrator" - is set on Session variable
		Session.set('usersList', Meteor.users.find({
			'profile.type': { 
				$eq: "User" 
			},
			'profile.role.role': { 
				$ne: "Super Administrator" 
			},
			'profile.deletedAt': { 
				$eq: null
			},
			deletedAt: null,
		}).fetch());
	},
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