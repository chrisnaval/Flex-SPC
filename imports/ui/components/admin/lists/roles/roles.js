import './roles.html';

// Component(s)
import '../../../modals/modals.js';

// Mongo Collection(s)
import { RolePermissions } from '/imports/api/collections/rolePermissions/rolePermissions.js';

Template.Roles_list.onCreated(function() {
    this.autorun(function() {
        Meteor.subscribe('rolePermissions.all', function() {
            Session.set('rolesList', RolePermissions.find({
                'role.role': { 
                    $ne: "Super Administrator" 
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
                    $ne: "Super Administrator" 
                },
            }).fetch());
        });
    });
});

Template.Roles_list.helpers({
    roles() {
		return Session.get('rolesList');
	}
});