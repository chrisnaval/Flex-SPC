import './roles.html'

// Mpngo Collection(s)
import { AppModules } from '/imports/api/collections/appModules/appModules.js';

Template.Roles_create.onCreated(function () {
    Meteor.subscribe('appModules.all');

    this.module = new ReactiveDict();
    this.module.set('showAdminModule', false);
    this.module.set('showUserModule', false);
    this.module.set('showRadioButtons', false);
});

// UserProfile instead of Meteor.users
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
        return Template.instance().module.get('showAdminModule');
    },
    showUser() {
        return Template.instance().module.get('showUserModule');
    },
    showRadio() {
        return Template.instance().module.get('showRadioButtons');
    }
});

Template.Roles_create.events({
    'change select': function (event, template) {
        event.preventDefault();

        var selectModule = document.getElementById('module').value;

        if (selectModule === 'admin') {
            template.module.set('showAdminModule', true);
            template.module.set('showUserModule', false);
        } else {
            template.module.set('showUserModule', true);
            template.module.set('showAdminModule', false);
        }
    },
    'click tr': function (event) {
        event.preventDefault();
        var modules = document.getElementsByClassName('module');
        var tar = document.getElementsByTagName('tr');

        for (var m = 0; m < modules.length; m++) {
            modules[m].style.display = 'none';
        }

        for (var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
        }

        const target = event.target.closest('tr');
        target.classList.add('selected');

        var data = document.getElementsByClassName('selected');
        var data_value = data[0].getElementsByClassName('role')[0].innerText;
        document.getElementById(data_value).style.display = 'block';
    },
    'submit form': function (event) {
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
        }

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var modules = checkboxes[i].value.split('.')[0];
                var functionName = checkboxes[i].value.split('.')[1];

                var permissionDatas = {
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