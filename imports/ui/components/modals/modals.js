import './modals.html';

// Meteor Package(s)
import { Session } from 'meteor/session';

// Mongo Collection(s)
import { AppModules } from '/imports/api/collections/appModules/appModules.js';
import { Configurations } from '/imports/api/collections/configurations/configurations.js';
import { Parameters } from '/imports/api/collections/parameters/parameters.js';
import { Products } from '/imports/api/collections/products/products.js';
import { RolePermissions } from '/imports/api/collections/rolePermissions/rolePermissions.js';
import { Testers } from '/imports/api/collections/testers/testers.js';

// Template Created
//Configuration
Template.Configuration.onCreated(function() {
    Meteor.subscribe('configurations.all');
});

// Parameter
Template.Parameter.onCreated(function() {
    Meteor.subscribe('parameters.all');
});
// Product
Template.Product.onCreated(function() {
    Meteor.subscribe('products.all');
});
// Role_view
Template.Role_view.onCreated(function () {
    Meteor.subscribe('appModules.all');
    Meteor.subscribe('rolePermissions.all');
});
// Tester
Template.Tester.onCreated(function() {
    Meteor.subscribe('testers.all');
});

//template onrendered
Template.Role_view.onRendered(function() {
	var radioElement = document.getElementsByClassName('functionName');
     for(var i = 0; i < radioElement.length;i++) {
        radioElement[i].checked = true;
    }
});

// Template Helpers
//Configuration
Template.Configuration.helpers({
    configuration() {
        return Configurations.find({});
    }
});

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
            _id: roleId
        });

        if(rolePermision) {
            return AppModules.find({
                type: rolePermision.role.type
            });
        }
    },
    dashboard(module) {
        var dashboard = 'dashboard';
        return dashboard === module;
    },
    rolePermission() {
        var roleId = Session.get('roleId');

        return RolePermissions.findOne({
            _id: roleId
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
Template.Change_password.events({
    'click .cancel': function() {
        var modal = document.getElementById('change-password');
		modal.style.display = 'none';
    },
    'click .submit': function(event) {
        event.preventDefault();

        var oldPass = document.getElementById('oldPassword').value;
        var newPass = document.getElementById('newPassword').value;
        var changePass = document.getElementById('changePassword').value;

        if(newPass === changePass) {
            Accounts.changePassword(oldPass, newPass, function(error) {
                if(error) {
                    Session.set('failure', error.reason);
                    alertMessage.style.display = 'block';
                } else {
                    Session.set('success', 'Successfully Updated');
                }
            });
        } else {
            Session.set('failure', 'New Password and Confirm Password dont match !');
        }
        var modal = document.getElementById('change-password');
        modal.style.display = 'none';
    },
});

Template.Configuration.events({
    'click .cancel': function() {
        var modal = document.getElementById('configurationModal');
        var tr = document.getElementsByTagName('tr');

        for(var i = 0; i < tr.length; i++) {
            tr[i].classList.remove('selected');
         }

        modal.style.display = 'none';
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
    'click tr': function (event) {
        event.preventDefault();
        var radioElement = document.getElementsByClassName('functionName');
        var accessAll = document.getElementById('access-all');
        var tar = document.getElementsByTagName('tr');

        if(!accessAll.checked) {
            for(var i = 0; i < radioElement.length; i++) {
                radioElement[i].checked = false;
            }
            for(var i = 0; i < tar.length; i++) {
                tar[i].classList.remove('selected');
            }
    
            const target = event.target.closest('tr');
            target.classList.add('selected');
        }

        var data = document.getElementsByClassName('selected');
        var moduleData = data[0].getElementsByClassName('module')[0].getAttribute('module-value');
        rolePermissionId = Session.get('roleId');

        var rolePermission = RolePermissions.findOne({ _id: rolePermissionId });
        
        var permission = rolePermission.permissions;
        permission.forEach(element => {
            if(element.module === moduleData) {
                document.getElementById(element.function).checked = true;     
            }
        })
    },
    'click .functionName': function() {
        return false;
    }
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