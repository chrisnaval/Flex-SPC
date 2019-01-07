import './users.html';

// Component(s)
import '../../../modals/modals.js';

// Meteor Package(s)
import { ReactiveDict } from 'meteor/reactive-dict';

var globalObj = {};

Template.Users_list.onCreated(function() {
	this.state = new ReactiveDict();

	var user = Meteor.user();
	if(user && user.profile.role.role == "Super Administrator") {
		this.state.set({
			viewAll: true,
			viewAdmins: false,
			viewUsers: false
		});
	} else {
		this.state.set({
			viewAll: false,
			viewAdmins: true,
			viewUsers: false
		});

		var viewAdmins = document.getElementById('view-admins');
		if(viewAdmins) {
			viewAdmins.parentElement.classList.add('active');
		}
	}

	this.autorun(function() {
		Session.set('usersList', Meteor.users.find({
			'profile.role.role': { 
				$ne: "Super Administrator" 
			},
			'profile.deletedAt': { 
				$eq: null
			},
			deletedAt: null,
		}, { $sort : { createdAt: -1} }).fetch());

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

	globalObj = {
		viewAll: this.state.get('viewAll'),
		viewAdmins: this.state.get('viewAdmins'),
		viewUsers: this.state.get('viewUsers')
	};
});

Template.Users_list.onRendered(function() {
	this.state = new ReactiveDict();
	
	var user = Meteor.user();
	if(user && user.profile.role.role == "Super Administrator") {
		this.state.set({
			viewAll: true,
			viewAdmins: false,
			viewUsers: false
		});
	} else {
		this.state.set({
			viewAll: false,
			viewAdmins: true,
			viewUsers: false
		});

		var viewAdmins = document.getElementById('view-admins');
		if(viewAdmins) {
			viewAdmins.parentElement.classList.add('active');
		}
	}

	this.autorun(function() {
		Session.set('usersList', Meteor.users.find({
			'profile.role.role': { 
				$ne: "Super Administrator" 
			},
			'profile.deletedAt': { 
				$eq: null
			},
			deletedAt: null,
		}, { $sort : { createdAt: -1} }).fetch());
		
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

	globalObj = {
		viewAll: this.state.get('viewAll'),
		viewAdmins: this.state.get('viewAdmins'),
		viewUsers: this.state.get('viewUsers')
	};
});

// Template Helpers
Template.Users_list.helpers({
	users() {
		return Session.get('usersList');
	},
	isSuperAdmin() {
		var user = Meteor.user();

		if(user && user.profile.role.role == "Super Administrator") {
			return true;
		} else {
			var viewAdmins = document.getElementById('view-admins');
			if(viewAdmins) {
				viewAdmins.parentElement.classList.add('active');
			}
		}
	},
	viewActions() {
		var user = Meteor.user();
		var instance = Template.instance();

		if(user) {
			if(user.profile.role.role == "Super Administrator" && instance.state.get('viewAll')) {
				return instance.state.get('viewAll');
			} else if(user.profile.type == "Admin") {
				if(instance.state.get('viewAdmin')) {
					return !instance.state.get('viewAdmin');
				} else if(instance.state.get('viewUsers')) {
					return instance.state.get('viewUsers');
				} else {
					return false;
				}
			} 
		}
	}, 
});

Template.User_data.helpers({
	viewActions() {
		var user = Meteor.user();

		if(user) {
			if(user.profile.role.role == "Super Administrator" && globalObj.viewAll) {
				return globalObj.viewAll;
			} else if(user.profile.type == "Admin") {
				if(globalObj.viewAll) {
					return !globalObj.viewAll;
				} else if(globalObj.viewUsers) {
					return globalObj.viewUsers;
				} else {
					return false;
				}
			} 
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
		
		instance.state.set({
			viewAll: true,
			viewAdmins: false,
			viewUsers: false
		});

		globalObj = {
			viewAll: instance.state.get('viewAll'),
			viewAdmins: instance.state.get('viewAdmins'),
			viewUsers: instance.state.get('viewUsers')
		};
	},
	'click #view-admins': function(event, instance) {
		event.target.parentElement.classList.add('active');
		
		var viewAll = document.getElementById('view-all');
		var viewUsers = document.getElementById('view-users');
		
		if(viewAll) {
			viewAll.parentElement.classList.remove('active');
		}
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

		instance.state.set({
			viewAll: false,
			viewAdmins: true,
			viewUsers: false
		});

		globalObj = {
			viewAll: instance.state.get('viewAll'),
			viewAdmins: instance.state.get('viewAdmins'),
			viewUsers: instance.state.get('viewUsers')
		};
	},
	'click #view-users': function(event, instance) {
		event.target.parentElement.classList.add('active');

		var viewAll = document.getElementById('view-all');
		var viewAdmins = document.getElementById('view-admins');
		
		if(viewAll) {
			viewAll.parentElement.classList.remove('active');
		}
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

		instance.state.set({
			viewAll: false,
			viewAdmins: false,
			viewUsers: true
		});;

		globalObj = {
			viewAll: instance.state.get('viewAll'),
			viewAdmins: instance.state.get('viewAdmins'),
			viewUsers: instance.state.get('viewUsers')
		};
	},
	'click .remove-user': function(event) {
		event.preventDefault();

		var modal = document.getElementById('deleteModal');
		modal.style.display = 'block';
		document.getElementById('delete_id').value = this._id;
	},
	'click .remove': function(event) {
		event.preventDefault();

		var userId = document.getElementById('delete_id').value;

		Meteor.call('users.remove', userId, function(error) {
            if(error) {
                document.getElementById('error-msg').innerHTML = error.reason;
            }
		});

		document.getElementById('delete_id').value = '';
		var modal = document.getElementById('deleteModal');
		modal.style.display = 'none';
	}
});