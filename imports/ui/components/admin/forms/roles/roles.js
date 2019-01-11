import './roles.html';

//component
import '../../../alert-message/alert-message.js';

// Collection(s)
import { AppModules } from '/imports/api/collections/appModules/appModules.js';
import { RolePermissions } from '/imports/api/collections/rolePermissions/rolePermissions.js';

//oncreated
Template.Role_create.onCreated(function () {
    Meteor.subscribe('appModules.all');

    this.reactive = new ReactiveDict();

    this.reactive.set({
        showAdminModule: true,
        showUserModule: false,
        showRadioButtons: false,
        rolePermission: []
    });
});

Template.Role_update.onCreated(function () {

    this.reactive = new ReactiveDict();

    this.reactive.set('roleId', FlowRouter.getParam('_id'));
    this.reactive.set({
        showAdminModule: true,
        showUserModule: false,
        showRadioButtons: false,
        rolePermission: [],
    });
});

//helpers
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

Template.Role_update.helpers({
    roleData() {
        return RolePermissions.findOne({
            _id: Template.instance().reactive.get('roleId'),
        });
    },
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

//events
Template.Role_create.events({
    'change select': function (event, template) {
        event.preventDefault();

        var selectModule = document.getElementById('module').value;
        if (selectModule == "user") {
            template.reactive.set('showAdminModule', false);
            template.reactive.set('showUserModule', true);
        } else {
            template.reactive.set('showUserModule', false);
            template.reactive.set('showAdminModule', true);
        }
    },
    'click tr': function (event) {
        event.preventDefault();
        document.getElementById('access-all').checked = false;
        var radioElement = document.getElementsByClassName('functionName');
        var tar = document.getElementsByTagName('tr');

        for(var i = 0; i < radioElement.length; i++) {
            radioElement[i].checked = false;
        }
        for(var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
        }

        const target = event.target.closest('tr');
        target.classList.add('selected');
    },
    'change .functionName': function () {
        var radioElement = document.getElementsByClassName('functionName');
        var data = document.getElementsByClassName('selected');
        var moduleData = data[0].getElementsByClassName('module')[0].getAttribute('module-value');
        var permission = [];

        for(var i = 0; i < radioElement.length; i++) {
            if (radioElement[i].checked) {
                var permissions = moduleData + '.' + radioElement[i].value;
                permission.push(permissions);
            }
        }

        var rolePermission = {
            module: moduleData,
            permissions: permission
        }
        var rolePermissions = Template.instance().reactive.get('rolePermission');

        for(var i = 0; i < rolePermissions.length; i++) {
            if (rolePermissions[i].module === moduleData) {
                rolePermissions.splice(i, 1);
                break;
            }
        }

        rolePermissions.push(rolePermission);
        Template.instance().reactive.set('rolePermission', rolePermissions);
    },
    'click #access-all': function () {
        var radioElement = document.getElementsByClassName('functionName');
        for(var i = 0; i < radioElement.length; i++) {
            radioElement[i].checked = true;
        }

        var radioElement = document.getElementsByClassName('functionName');
        var data = document.getElementsByClassName('selected');
        var moduleData = data[0].getElementsByClassName('module')[0].getAttribute('module-value');
        var permission = [];

        for(var i = 0; i < radioElement.length; i++) {
            if (radioElement[i].checked) {
                var permissions = moduleData + '.' + radioElement[i].value;
                permission.push(permissions);
            }
        }

        var rolePermission = {
            module: moduleData,
            permissions: permission
        }
        var rolePermissions = Template.instance().reactive.get('rolePermission');

        for(var i = 0; i < rolePermissions.length; i++) {
            if (rolePermissions[i].module === moduleData) {
                rolePermissions.splice(i, 1);
                break;
            }
        }

        rolePermissions.push(rolePermission);
        Template.instance().reactive.set('rolePermission', rolePermissions);
    },
    'submit form': function (event) {
        event.preventDefault();
        const target = event.target;

        var roles = target.roleName.value;
        var descriptions = target.description.value;
        var element = document.getElementById('module');
        var alertMessage = document.getElementById('alert-message');
        var roleType = element.options[element.selectedIndex].value;
        var permissionsData = [];


        var rolePermission = Template.instance().reactive.get('rolePermission');
        var permissionsList = [];

        for(var i = 0; i < rolePermission.length; i++) {
            for(var key in rolePermission[i].permissions) {
                permissionsList.push(rolePermission[i].permissions[key]);
            }
        }

        var roleData = {
            role: roles,
            description: descriptions,
            type: roleType
        }

        for(var i = 0; i < permissionsList.length; i++) {
            var modules = permissionsList[i].split('.')[0];
            var functionName = permissionsList[i].split('.')[1];
            var permissionDatas = {
                module: modules,
                functionName: functionName,
                permission: roleType + '-' + modules + '.' + functionName
            }

            permissionsData.push(permissionDatas);
        }

        Meteor.call('rolePermissions.insert', roleData, permissionsData, function(error) {
            if(error) {
                Session.set('failure', error.reason);
                alertMessage.style.display = 'block';
            } else {
                Session.set('success', 'Successfully Created');
                FlowRouter.go('/admin/roles-list');
            }
        });
        
    }
});

Template.Role_update.events({
    'change select': function (event, template) {
        const target = event.target;

        var selectModule = target.options[target.selectedIndex].value;
        if (selectModule == "user") {
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

        for(var i = 0; i < radioElement.length; i++) {
            radioElement[i].checked = false;
        }
        for(var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
        }

        const target = event.target.closest('tr');
        target.classList.add('selected');
    },
    'change .functionName': function () {
        var radioElement = document.getElementsByClassName('functionName');
        var data = document.getElementsByClassName('selected');
        var moduleData = data[0].getElementsByClassName('module')[0].getAttribute('module-value');
        var permission = [];

        for(var i = 0; i < radioElement.length; i++) {
            if (radioElement[i].checked) {
                var permissions = moduleData + '.' + radioElement[i].value;
                permission.push(permissions);
            }
        }

        var rolePermission = {
            module: moduleData,
            permissions: permission
        }
        var rolePermissions = Template.instance().reactive.get('rolePermission');

        for(var i = 0; i < rolePermissions.length; i++) {
            if (rolePermissions[i].module === moduleData) {
                rolePermissions.splice(i, 1);
                break;
            }
        }

        rolePermissions.push(rolePermission);
        Template.instance().reactive.set('rolePermission', rolePermissions);
    },
    'click #select-all': function () {
        var radioElement = document.getElementsByClassName('functionName');
        for(var i = 0; i < radioElement.length; i++) {
            radioElement[i].checked = true;
        }

        var radioElement = document.getElementsByClassName('functionName');
        var data = document.getElementsByClassName('selected');
        var moduleData = data[0].getElementsByClassName('module')[0].getAttribute('module-value');
        var permission = [];

        for(var i = 0; i < radioElement.length; i++) {
            if (radioElement[i].checked) {
                var permissions = moduleData + '.' + radioElement[i].value;
                permission.push(permissions);
            }
        }

        var rolePermission = {
            module: moduleData,
            permissions: permission
        }
        var rolePermissions = Template.instance().reactive.get('rolePermission');

        for(var i = 0; i < rolePermissions.length; i++) {
            if (rolePermissions[i].module === moduleData) {
                rolePermissions.splice(i, 1);
                break;
            }
        }

        rolePermissions.push(rolePermission);
        Template.instance().reactive.set('rolePermission', rolePermissions);
    },
    'submit form': function (event) {
        event.preventDefault();
        const target = event.target;

        var roles = target.roleName.value;
        var descriptions = target.description.value;
        var element = document.getElementById('module');
        var alertMessage = document.getElementById('alert-message');
        var roleType = element.options[element.selectedIndex].value;
        var permissionsData = [];


        var rolePermission = Template.instance().reactive.get('rolePermission');
        var rolePermissionId = Template.instance().reactive.get('roleId');
        var permissionsList = [];

        for(var i = 0; i < rolePermission.length; i++) {
            for(var key in rolePermission[i].permissions) {
                permissionsList.push(rolePermission[i].permissions[key]);
            }
        }

        var roleData = {
            role: roles,
            description: descriptions,
            type: roleType
        };

        for(var i = 0; i < permissionsList.length; i++) {
            var modules = permissionsList[i].split('.')[0];
            var functionName = permissionsList[i].split('.')[1];
            var permissionDatas = {
                module: modules,
                functionName: functionName,
                permission: roleType + '-' + modules + '.' + functionName
            }

            permissionsData.push(permissionDatas);
        }

        var rolePermissionData = {
            permissionsData,
            roleData
        };

        Meteor.call('rolePermissions.update', rolePermissionId, rolePermissionData, function(error) {
            if(error) {
                Session.set('failure', error.reason);
                alertMessage.style.display = 'block';
            } else {
                Session.set('success', 'Successfully Created');
                FlowRouter.go('/admin/roles-list');
            }
        });
        
    }
});