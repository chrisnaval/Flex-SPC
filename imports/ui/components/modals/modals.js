import './modals.html';

// Meteor Package(s)
import { Session } from 'meteor/session';

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
// Role_view
Template.Role_view.onCreated(function () {
    Meteor.subscribe('appModules.all');
    Meteor.subscribe('rolePermissions.all');
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
// Role_view
Template.Role_view.helpers({
    appModules() {
        var roleId = Session.get('roleId');
        var rolePermision = RolePermissions.findOne({
            'role._id': roleId
        });

        if(rolePermision) {
            var type = rolePermision.role.type;
        
            return AppModules.find({
                type: type
            });
        }
    },
    rolePermission() {
        var roleId = Session.get('roleId');

        return RolePermissions.findOne({
            'role._id': roleId
        });
    },
});
// User_profile
Template.User_profile.helpers({
    userProfileData() {
        return Meteor.user();
    }
});
// User_view
Template.User_view.helpers({
    userData() {
        return Meteor.users.findOne({
            _id: Session.get('userId'),
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
Template.Change_pass.events({
    'click .cancel': function() {
        var modal = document.getElementById('change-password');
		modal.style.display = 'none';
    },
    'click .submit': function() {
       var oldPass = document.getElementById('oldPassword').value;
       var newPass = document.getElementById('newPassword').value;
       var changePass = document.getElementById('changePassword').value;
   }
});
//custom dashboard
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
// Role_view
Template.Role_view.events({
    'click .close-toggle': function() {
        var modal = document.getElementById('role-view');
        modal.style.display = 'none';
    },
});
// User_profile
Template.User_profile.events({
    'click .close-toggle': function() {
        var modal = document.getElementById('user-profile');
        modal.style.display = 'none';
    },
});
// User_view
Template.User_view.events({
    'click .close-toggle': function() {
        var modal = document.getElementById('user-view');
        modal.style.display = 'none';
    },
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