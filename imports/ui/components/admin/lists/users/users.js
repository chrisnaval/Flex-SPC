import './users.html';

// Component(s)
import '../../../modals/modals.js';

// Meteor Package(s)
import { ReactiveDict } from 'meteor/reactive-dict';

Template.Users_list.onCreated(function() {
	this.state = new ReactiveDict();

	this.autorun(function() {
		Meteor.subscribe('users.all', function() {
			Session.set('usersList', Meteor.users.find({
				'profile.role.role': { 
					$ne: "Super Administrator" 
				},
				'profile.deletedAt': { 
					$eq: null
				},
				deletedAt: null,
			}, { $sort : { createdAt: -1} }).fetch());
        });
	});

	this.state.set('usersList', Session.get('usersList'));
});

Template.Users_list.onRendered(function() {
	this.autorun(function() {
		Meteor.subscribe('users.all', function() {
            Session.set('usersList', Meteor.users.find({
				'profile.role.role': { 
					$ne: "Super Administrator" 
				},
				'profile.deletedAt': { 
					$eq: null
				},
				deletedAt: null,
			}, { $sort : { createdAt: -1} }).fetch());
        });
	});

	this.state.set('usersList', Session.get('usersList'));
});

// Template Helpers
Template.Users_list.helpers({
	users() {
		var session = Session.get('usersList');
		var instance = Template.instance().state.get('usersList');

		return (instance !== null) ? instance : session; 
		return Session.get('usersList');
	},
});

Template.User_data.helpers({
	isSuperAdmin() {
		var user = Meteor.user();
		
		if(user && user.profile.role.role == "Super Administrator") {
			return user.profile.role.role;
		}
	},
});

// Template Events
Template.Users_list.events({
	'click #view-all': function(event, instance) {
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
		}, { $sort : { createdAt: -1} }).fetch());

		instance.state.set('usersList', Session.get('usersList'));
	},
	'click #view-admins': function(event, instance) {
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
		}, { $sort : { createdAt: -1} }).fetch());

		instance.state.set('usersList', Session.get('usersList'));
	},
	'click #view-users': function(event, instance) {
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
		}, { $sort : { createdAt: -1} }).fetch());

		instance.state.set('usersList', Session.get('usersList'));
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
