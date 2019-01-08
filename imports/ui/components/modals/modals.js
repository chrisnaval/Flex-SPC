import './modals.html';

// Meteor Package(s)
import { Session } from 'meteor/session'

// Mongo Collection(s)
import { AppModules } from '/imports/api/collections/appModules/appModules.js';
import { Parameters } from '/imports/api/collections/parameters/parameters.js';
import { Products } from '/imports/api/collections/products/products.js';
import { RolePermissions } from '/imports/api/collections/rolePermissions/rolePermissions.js';
import { Testers } from '/imports/api/collections/testers/testers.js';


// Template Created
// Parameter
Template.Parameter.onCreated(function() {
    Meteor.subscribe('parametersData');
});
// Product
Template.Product.onCreated(function() {
    Meteor.subscribe('productsData');
});
// Read_role
Template.Read_role.onCreated(function () {
    Meteor.subscribe('appModules.all');
});
// Tester
Template.Tester.onCreated(function() {
    Meteor.subscribe('testersData');
});


// Template Helpers
// Parameter
Template.Parameter.helpers({
    parameters() {
        return Parameters.find({});
    }
});
// Product
Template.Product.helpers({
    products() {
        return Products.find({});
    }
});
// Read_role
Template.Read_role.helpers({
    getRolesData() {
        var roleId = Session.get('roleId');

        return RolePermissions.findOne({
            'role._id': roleId
        });
    },
    getModule() {
        var rolePermissionId = Session.get('rolePermissionId');

        var getModule = RolePermissions.findOne({
            _id: rolePermissionId
        });

        var type = getModule.role.role;
        return AppModules.find({
            type: type
        });
    },
});
// Read_user
Template.Read_user.helpers({
    getUserData() {
        var userId = Session.get('userId');

        return Meteor.users.findOne({
            _id: userId,
        });
    }
});
// Tester
Template.Tester.helpers({
    testers() {
		return Testers.find({});
	},
});


// Template Events
// Custom Dashboard
Template.Custom_dashboard.events({
    'click .cancel': function() {
        var modal = document.getElementById('formModal');
        var tr = document.getElementsByTagName('tr');

        for(var i = 0; i < tr.length; i++) {
            tr[i].classList.remove('selected');
         }

        modal.style.display = 'none';
    },
    'click tr': function(event) {
        var tar = document.getElementsByTagName('tr');

        for(var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
        }
         
        const target = event.target.closest('tr');
        target.classList.add('selected');
    },
});
// Delete_modal
Template.Delete_modal.events({
    'click .close-toggle': function() {
        var modal = document.getElementById('deleteModal');
        modal.style.display = 'none';
    },
    'click .cancel': function() {
        var modal = document.getElementById('deleteModal');
        modal.style.display = 'none';
    }
});
// Parameter
Template.Parameter.events({
    'click .cancel': function() {
        var modal = document.getElementById('parameterModal');
        var tr = document.getElementsByTagName('tr');

        for(var i = 0; i < tr.length; i++) {
            tr[i].classList.remove('selected');
         }

        modal.style.display = 'none';
    }
});
// Product
Template.Product.events({
    'click .cancel': function() {
        var modal = document.getElementById('productModal');
        var tr = document.getElementsByTagName('tr');

        for(var i = 0; i < tr.length; i++) {
            tr[i].classList.remove('selected');
         }

        modal.style.display = 'none';
    }
});
// Tester
Template.Tester.events({
    'click .cancel': function() {
        var modal = document.getElementById('testerModal');
        var tr = document.getElementsByTagName('tr');

        for(var i = 0; i < tr.length; i++) {
            tr[i].classList.remove('selected');
         }

        modal.style.display = 'none';
    }
});
// Read_role
Template.Read_role.events({
    'click .close-toggle': function() {
        var modal = document.getElementById('role_fetch');
        modal.style.display = 'none';
    },
});
// Read_user
Template.Read_user.events({
    'click .close-toggle': function() {
        var modal = document.getElementById('read_user');
        modal.style.display = 'none';
    },
});