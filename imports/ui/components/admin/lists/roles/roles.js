import './roles.html';
import '../../../modals/modals.js';

import { RolePermissions } from '/imports/api/collections/rolePermissions/rolePermissions.js';

Template.Roles_list.onCreated(function() {
    this.autorun(function() {
        Meteor.subscribe('rolePermissions.all', function() {
            Session.set('roleList', RolePermissions.find({
                'role.role': { 
                    $ne: "Super Administrator" 
                },
            }).fetch());
        });
    });
})

Template.Roles_list.onRendered(function() {
    this.autorun(function() {
        Meteor.subscribe('rolePermissions.all', function() {
            Session.set('roleList', RolePermissions.find({
                'role.role': { 
                    $ne: "Super Administrator" 
                },
            }).fetch());
        });
    });
})

Template.Roles_list.helpers({
    roles() {
		return Session.get('roleList');
	}
});

Template.Roles_list.events({
    'click .remove-role': function() {
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
	}
});