import './roles.html'

// Collection(s)
import { AppModules } from '/imports/api/collections/appModules/appModules.js';

Template.Roles_create.onCreated(function () {
    Meteor.subscribe('appModules.all');

    this.reactive = new ReactiveDict();

    this.reactive.set({
        showAdminModule: true,
        showUserModule: false,
        showRadioButtons: false,
        permissions:[]
    });
});

Template.Roles_create.helpers({
    getModuleAdminType() {
        return AppModules.find({
            type: 'admin'
        });
    },
    getModuleUserType() {
        return AppModules.find({
            type: 'user'
        });
    },
    showAdmin() {
        return Template.instance().reactive.get('showAdminModule');
    },
    showUser() {
        return Template.instance().reactive.get('showUserModule');
    },
    showRadio() {
        return Template.instance().reactive.get('showRadioButtons');
    }
});

Template.Roles_create.events({
    'change select': function(event, template) {
        event.preventDefault();

        var selectModule = document.getElementById('select_module').value;
        if(selectModule == "user") {
            template.reactive.set('showAdminModule', false);
            template.reactive.set('showUserModule', true);
        } else {
            template.reactive.set('showUserModule', false);
            template.reactive.set('showAdminModule', true);
        }
    },
    'click tr': function(event, instance) {
        event.preventDefault();

        var tar = document.getElementsByTagName('tr');

        for (var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
        }

        const target = event.target.closest('tr');
        target.classList.add('selected');

        var data = document.getElementsByClassName('selected');
        var module = data[0].getElementsByClassName('module')[0].getAttribute('module-value');
        var permissions = {
            module: module,
        };
        
        var radioElement = document.getElementsByClassName('functionName');
        for(var i = 0; i < radioElement.length; i++) {
            if(radioElement[i].checked) {
                console.log(radioElement[i].value);
            }
        }
    },
    'submit form': function(event) {
        event.preventDefault();
        const target = event.target;

        var roles = target.roleName.value;
        var descriptions = target.description.value;
        var element = document.getElementById('module');
        var permissions = element.options[element.selectedIndex].value;
        var checkboxes = document.getElementsByClassName('functionName');
        var permissionData = [];

        var role = {
            role: roles,
            description: descriptions
        };

        for(var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var modules = checkboxes[i].value.split('.')[0];
                var functionName = checkboxes[i].value.split('.')[1];

                var permissionDatas = {
                    name: "Issue Tracker",
                    module: modules,
                    functionName: functionName,
                    permission: permissions + '-' + modules + '.' + functionName
                }

                permissionData.push(permissionDatas);
            }
        }
        Meteor.call('rolePermissions.insert', role, permissionData, function(error) {
            if(error) {
                document.getElementById('error-msg').innerHTML = error.reason;
            }
        });
        FlowRouter.go('/admin/roles-list');
    }
});