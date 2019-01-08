import './modals.html';

//packages
import { Session } from 'meteor/session'

//api imports
import { AppModules } from '/imports/api/collections/appModules/appModules.js';
import { RolePermissions } from '/imports/api/collections/rolePermissions/rolePermissions.js';
import { Testers } from '/imports/api/collections/testers/testers.js';
import { Parameters } from '/imports/api/collections/parameters/parameters.js';
import { Products } from '/imports/api/collections/products/products.js';



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

//delete modal
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

//fetch role
Template.Read_role.onCreated(function () {
    Meteor.subscribe('appModules.all');
});
Template.Read_role.helpers({
    getRolesData() {
        var roleId = Session.get('roleId');

        return RolePermissions.findOne({
            _id: roleId
        });
    },
    getModule() {
        var roleId = Session.get('roleId');

        var getModule = RolePermissions.findOne({
            _id: roleId
        });

        var type = getModule.role.role;
        return  AppModules.find({
            type: type
        });
    },
});

Template.Read_role.events({
    'click .close-toggle': function() {
        var modal = document.getElementById('role_fetch');
        modal.style.display = 'none';
    },
});

//read user
Template.Read_user.helpers({
    getUserData() {
        var userId = Session.get('userId');

        return Meteor.users.findOne({
            _id: userId,
        });
    }
});
Template.Read_user.events({
    'click .close-toggle': function() {
        var modal = document.getElementById('read_user');
        modal.style.display = 'none';
    },
});

//tester
Template.Tester.onCreated(function() {
    Meteor.subscribe('testersData');
});

Template.Tester.helpers({
    testers() {
		return Testers.find({});
	},
});

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

//Parameter
Template.Parameter.onCreated(function() {
    Meteor.subscribe('parametersData');
});

Template.Parameter.helpers({
    parameters() {
        return Parameters.find({});
    }
});

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

//product
Template.Product.onCreated(function() {
    Meteor.subscribe('productsData');
});

Template.Product.helpers({
    products() {
        return Products.find({});
    }
});

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