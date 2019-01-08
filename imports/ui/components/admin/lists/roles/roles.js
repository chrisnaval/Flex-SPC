import './roles.html';
import '../../../modals/modals.js';

//packages
import { Session } from 'meteor/session'

// Mongo Collection(s)
import { RolePermissions } from '/imports/api/collections/rolePermissions/rolePermissions.js';

Template.Roles_list.onCreated(function() {
    this.autorun(function() {
        Meteor.subscribe('rolePermissions.all', function() {
            Session.set('rolesList', RolePermissions.find({
                'role.role': { 
                    $ne: 'Super Administrator' 
                },
            }).fetch());
        });
    });
});

Template.Roles_list.onRendered(function() {
    this.autorun(function() {
        Meteor.subscribe('rolePermissions.all', function() {
            Session.set('rolesList', RolePermissions.find({
                'role.role': { 
                    $ne: 'Super Administrator' 
                },
            }).fetch());
        });
    });
});

Template.Roles_list.helpers({
    roles() {
		return Session.get('rolesList');
    },
});

Template.Roles_list.events({
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

        var element = document.getElementsByClassName("selected");
        var element_value = element[0].getAttribute('data-id');
        document.getElementById('roleId').value = element_value;
        Session.set('roleId', element_value)
        var modal = document.getElementById('role_fetch');
        // var modal = document.getElementById('read_user');
		modal.style.display = 'block';
    }
});