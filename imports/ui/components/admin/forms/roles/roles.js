import './roles.html'

// Collection(s)
import { AppModules } from '/imports/api/collections/appModules/appModules.js';

Template.Role_create.onCreated(function () {
    Meteor.subscribe('appModules.all');

    this.reactive = new ReactiveDict();

    this.reactive.set({
        showAdminModule: true,
        showUserModule: false,
        showRadioButtons: false,
        rolePermission:[]
    });
});

Template.Role_create.helpers({
    adminAppModules() {
        return AppModules.find({
            type: "admin"
        });
    },
    userAppModules() {
        return AppModules.find({
            type: "user"
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
    },
});

Template.Role_create.events({
    'change select': function(event, template) {
        event.preventDefault();

        var selectModule = document.getElementById('module').value;
        if(selectModule == "user") {
            template.reactive.set('showAdminModule', false);
            template.reactive.set('showUserModule', true);
        } else {
            template.reactive.set('showUserModule', false);
            template.reactive.set('showAdminModule', true);
        }
    },
    'click tr': function (event) {
        event.preventDefault();
        var radioElement = document.getElementsByClassName('functionName');
        var tar = document.getElementsByTagName('tr');

        for (var i = 0; i < radioElement.length; i++) {
            radioElement[i].checked = false;
        }
        for (var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
        }

        const target = event.target.closest('tr');
        target.classList.add('selected');
    },
    'change .functionName': function() {
        var radioElement = document.getElementsByClassName('functionName');
        var data = document.getElementsByClassName('selected');
        var moduleData = data[0].getElementsByClassName('module')[0].getAttribute('module-value');
        var permission = [];

        for (var i = 0; i < radioElement.length; i++) {
            if (radioElement[i].checked) {
                var permissions = moduleData+'.'+radioElement[i].value;
                permission.push(permissions);
            }
        }

        var rolePermission = {
            module:moduleData,
            permissions: permission
        }
        var rolePermissions = Template.instance().reactive.get('rolePermission');

        for (var i =0; i < rolePermissions.length; i++) {
            if (rolePermissions[i].module === moduleData) {
                rolePermissions.splice(i,1);
                break;
            }
        }
        
        rolePermissions.push(rolePermission);
        Template.instance().reactive.set('rolePermission', rolePermissions);
    },
    'click #select-all': function() {
        var radioElement = document.getElementsByClassName('functionName');
        for (var i = 0; i < radioElement.length; i++) {
            radioElement[i].checked = true;
        }

        var radioElement = document.getElementsByClassName('functionName');
        var data = document.getElementsByClassName('selected');
        var moduleData = data[0].getElementsByClassName('module')[0].getAttribute('module-value');
        var permission = [];

        for (var i = 0; i < radioElement.length; i++) {
            if (radioElement[i].checked) {
                var permissions = moduleData+'.'+radioElement[i].value;
                permission.push(permissions);
            }
        }

        var rolePermission = {
            module:moduleData,
            permissions: permission
        }
        var rolePermissions = Template.instance().reactive.get('rolePermission');

        for (var i =0; i < rolePermissions.length; i++) {
            if (rolePermissions[i].module === moduleData) {
                rolePermissions.splice(i,1);
                break;
            }
        }
        
        rolePermissions.push(rolePermission);
        Template.instance().reactive.set('rolePermission', rolePermissions);
    },
    'submit form': function(event) {
        event.preventDefault();
        const target = event.target;

        var roles = target.roleName.value;
        var descriptions = target.description.value;
        var element = document.getElementById('module');
        var permissions = element.options[element.selectedIndex].value;
        var permissionData = [];


        var rolePermission = Template.instance().reactive.get('rolePermission');
        var permissions = [];

        for (var i = 0; i < rolePermission.length; i++) {
            for (var key in rolePermission[i].permissions) {
                permissions.push(rolePermission[i].permissions[key]);
            }
        }

        var role = {
            role: roles,
            description: descriptions
        };

        for(var i = 0; i < permissions.length; i++) {
                var modules = permissions[i].split('.')[0];
                var functionName = permissions[i].split('.')[1];
                console.log(modules, functionName);
                // var permissionDatas = {
                //     name: "Issue Tracker",
                //     module: modules,
                //     functionName: functionName,
                //     permission: permissions + '-' + modules + '.' + functionName
                // }

                // permissionData.push(permissionDatas);
            }
        }
        // console.log(permissionData, role);
        // Meteor.call('rolePermissions.insert', role, permissionData, function(error) {
        //     if(error) {
        //         document.getElementById('error-msg').innerHTML = error.reason;
        //     }
        // });
        // FlowRouter.go('/admin/roles-list');
    }
});