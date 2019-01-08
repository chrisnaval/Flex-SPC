import './roles.html';

// Component(s)
import '../../../modals/modals.js';

// Meteor Package(s)
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

// Mongo Collection(s)
import { Roles } from '/imports/api/collections/roles/roles.js';


// Global Object for View Navigation
var globalObj = {};

Template.Roles_list.onCreated(function() {
    this.state = new ReactiveDict();

    var user = Meteor.user();
	if(user) {
		if(user.profile.role.role == "Super Administrator") {
			this.state.set({
				viewAll: true,
				viewAdmins: false,
				viewUsers: false
			});
		} else if(user.profile.type == "admin" && user.profile.role.role != "Super Administrator") {
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
    }
    
    // Autorun
	this.autorun(function() {
		var user = Meteor.user();
		if(user) {
			if(user.profile.role.role == "Super Administrator") {
				Session.set('rolesList', Roles.find({
                    'role': { 
                        $ne: "Super Administrator" 
                    },
                }).fetch());
			} else if(user.profile.type == "admin" && user.profile.role.role != "Super Administrator") {
				Session.set('rolesList', Roles.find({
                    'role': { 
                        $ne: "Super Administrator" 
                    },
                    'type': {
                        $eq: "admin"
                    }
                }).fetch());
			}

            // Subscription
            Meteor.subscribe('roles.all', function() {
                if(user.profile.role.role == "Super Administrator") {
					Session.set('rolesList', Roles.find({
                        'role': { 
                            $ne: "Super Administrator" 
                        },
                    }).fetch());
				} else if(user.profile.type == "admin" && user.profile.role.role != "Super Administrator") {
					Session.set('rolesList', Roles.find({
                        'role': { 
                            $ne: "Super Administrator" 
                        },
                        'type': {
                            $eq: "admin"
                        }
                    }).fetch());
				}
            });
		}
    });
    
    globalObj = {
		viewAll: this.state.get('viewAll'),
		viewAdmins: this.state.get('viewAdmins'),
		viewUsers: this.state.get('viewUsers')
	};
});

Template.Roles_list.onRendered(function() {
    this.state = new ReactiveDict();
	
	var user = Meteor.user();
	if(user) {
		if(user.profile.role.role == "Super Administrator") {
			this.state.set({
				viewAll: true,
				viewAdmins: false,
				viewUsers: false
			});
		} else if(user.profile.type == "admin" && user.profile.role.role != "Super Administrator") {
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
    }
    
    // Autorun
	this.autorun(function() {
		var user = Meteor.user();
		if(user) {
			if(user.profile.role.role == "Super Administrator") {
				Session.set('rolesList', Roles.find({
                    'role.role': { 
                        $ne: "Super Administrator" 
                    },
                }).fetch());
			} else if(user.profile.type == "admin" && user.profile.role.role != "Super Administrator") {
				Session.set('rolesList', Roles.find({
                    'role': { 
                        $ne: "Super Administrator" 
                    },
                    'type': {
                        $eq: "admin"
                    }
                }).fetch());
			}

            // Subscription
            Meteor.subscribe('roles.all', function() {
                if(user.profile.role.role == "Super Administrator") {
					Session.set('rolesList', Roles.find({
                        'role': { 
                            $ne: "Super Administrator" 
                        },
                    }).fetch());
				} else if(user.profile.type == "admin" && user.profile.role.role != "Super Administrator") {
					Session.set('rolesList', Roles.find({
                        'role': { 
                            $ne: "Super Administrator" 
                        },
                        'type': {
                            $eq: "admin"
                        }
                    }).fetch());
				}
            });
		}
    });
    
    globalObj = {
		viewAll: this.state.get('viewAll'),
		viewAdmins: this.state.get('viewAdmins'),
		viewUsers: this.state.get('viewUsers')
	};
});

// Template Helpers
// Roles_list
Template.Roles_list.helpers({
    roles() {
		return Session.get('rolesList');
    },
    isSuperAdmin() {
		var user = Meteor.user();
		if(user) {
			if(user.profile.role.role == "Super Administrator") {
				return true;
			} else if(user.profile.type == "admin" && user.profile.role.role != "Super Administrator") {
				var viewAdmins = document.getElementById('view-admins');
				if(viewAdmins) {
					viewAdmins.parentElement.classList.add('active');
				}
			} else {
				return false;
			}
		}
	},
	viewActions() {
		var instance = Template.instance();
        var user = Meteor.user();
		if(user) {
			if(user.profile.type == "admin" && user.profile.role.role != "Super Administrator") {
				if(instance.state.get('viewAdmin')) {
					return !instance.state.get('viewAdmin');
				} else if(instance.state.get('viewUsers')) {
					return instance.state.get('viewUsers');
				} else {
					return false;
				}
			} else if(user.profile.type == "user") { 
				return false;
			} else {
				return true;
			}
		}
	}, 
});
// Roles_data
Template.Roles_data.helpers({
	viewActions() {
		var user = Meteor.user();
		if(user) {
			if(user.profile.type == "admin" && user.profile.role.role != "Super Administrator") {
				if(globalObj.viewAll) {
					return !globalObj.viewAll;
				} else if(globalObj.viewUsers) {
					return globalObj.viewUsers;
				} else {
					return false;
				}
			} else if(user.profile.type == "user") { 
				return false;
			} else {
				return true;
			}
		}
	},
});

// Template Events
Template.Roles_list.events({
    'click #view-all': function(event, instance) {
		event.target.parentElement.classList.add('active');

		var viewAdmins = document.getElementById('view-admins');
		var viewUsers = document.getElementById('view-users');
		
		viewAdmins.parentElement.classList.remove('active');
		viewUsers.parentElement.classList.remove('active');

		// Retrieves all roles except "Super Administrator" - is set on Session variable
		Session.set('rolesList', Roles.find({
            'role': { 
                $ne: "Super Administrator" 
            },
        }).fetch());
		
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

		// Retrieves all roles with type "admin" except "Super Administrator" - is set on Session variable
		Session.set('rolesList', Roles.find({
            'role': { 
                $ne: "Super Administrator" 
            },
            'type': {
                $eq: "admin"
            }
        }).fetch());

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

		// Retrieves all roles with type "user" except "Super Administrator" - is set on Session variable
		Session.set('rolesList', Roles.find({
            'role': { 
                $ne: "Super Administrator" 
            },
            'type': {
                $eq: "user"
            }
        }).fetch());

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
    'click .remove-role': function(event) {
        event.preventDefault();

		var modal = document.getElementById('deleteModal');
		modal.style.display = 'block';
		document.getElementById('delete_id').value = this._id;
    },
    'click .remove': function(event) {
		event.preventDefault();

		var rolePermissionId = document.getElementById('delete_id').value;

		Meteor.call('rolePermissions.remove', rolePermissionId, function(error) {
            if(error) {
                document.getElementById('error-msg').innerHTML = error.reason;
            }
		});

		document.getElementById('delete_id').value = '';
		var modal = document.getElementById('deleteModal');
		modal.style.display = 'none';
    },
    'click .role-list': function(event) {
        event.preventDefault();

        var tar = document.getElementsByTagName('tr');
        for(var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
        }

        const target = event.target.closest('tr');
        target.classList.add('selected');

        var element = document.getElementsByClassName('selected');
        var elementVal = element[0].getAttribute('data-id');

        // document.getElementById('roleId').value = elementVal;
        Session.set('rolePermissionId', elementVal);
        
        var modal = document.getElementById('role_fetch');
		modal.style.display = 'block';
    }
});