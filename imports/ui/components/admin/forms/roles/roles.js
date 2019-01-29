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
        rolePermission: [],
    });
});

Template.Role_update.onCreated(function () {
    Meteor.subscribe('rolePermissions.all');
    Meteor.subscribe('appModules.all');

    this.reactive = new ReactiveDict();

    this.reactive.set('roleId', FlowRouter.getParam('_id'));
    this.reactive.set({
        showAdminModule: true,
        showUserModule: false,
        showRadioButtons: false,
        rolePermission: [],
    });
});

//onrendered
Template.Role_create.onRendered(function () {
    var radioElement = document.getElementsByClassName('functionName');
    for (var i = 0; i < radioElement.length; i++) {
        radioElement[i].checked = true;
        radioElement[i].setAttribute('disabled', true);
    }
});

Template.Role_update.onRendered(function () {
    var radioElement = document.getElementsByClassName('functionName');
    
    for (var i = 0; i < radioElement.length; i++) {
        radioElement[i].checked = true;
        radioElement[i].setAttribute('disabled', true);
    }

    var element = document.getElementById('module');
    var roleType = element.options[element.selectedIndex].value;
    
    if(roleType === 'user') {
        Template.instance().reactive.set('showAdminModule', false);
        Template.instance().reactive.set('showUserModule', true);
    } else {
        Template.instance().reactive.set('showUserModule', false);
        Template.instance().reactive.set('showAdminModule', true);
    }
});
//helpers
Template.Role_create.helpers({
    dashboard(module) {
        var dashboard = 'dashboard';
        return dashboard === module;
    },
    adminAppModules() {
        return AppModules.find({
            type: 'admin'
        });
    },
    userAppModules() {
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
    },
});

Template.Role_update.helpers({
    dashboard(module) {
        var dashboard = 'dashboard';
        return dashboard === module;
    },
    roleData() {
        return RolePermissions.findOne({
            _id: Template.instance().reactive.get('roleId')
        });
    },
    adminAppModules() {
        return AppModules.find({
            type: 'admin'
        });
    },
    userAppModules() {
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
    },
});

//events
Template.Role_create.events({
    'change select': function (event, template) {
        const target = event.target;

        var selectModule = target.options[target.selectedIndex].value;
        if (selectModule == 'user') {
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
        var accessAll = document.getElementById('access-all');
        var tar = document.getElementsByTagName('tr');

        if (!accessAll.checked) {
            for (var i = 0; i < radioElement.length; i++) {
                radioElement[i].checked = false;
                radioElement[i].removeAttribute('disabled');
            }
            for (var l = 0; l < tar.length; l++) {
                tar[l].classList.remove('selected');
            }

            const target = event.target.closest('tr');
            target.classList.add('selected');

            var data = document.getElementsByClassName('selected');
            var moduleData = data[0].getElementsByClassName('module')[0].getAttribute('module-value');

            if (moduleData == 'dashboard') {
                for (var k = 0; k < radioElement.length; k++) {
                    radioElement[k].checked = true;
                    radioElement[k].setAttribute('disabled', true);
                }
            } else if (moduleData == 'roles') {
                document.getElementById('view').checked = true;
                document.getElementById('view').setAttribute('disabled', true);
            } else if (moduleData == 'users') {
                document.getElementById('create').checked = true;
                document.getElementById('view').checked = true;
                document.getElementById('create').setAttribute('disabled', true);
                document.getElementById('view').setAttribute('disabled', true);
            }
        }
    },
    'change .functionName': function () {
        var radioElement = document.getElementsByClassName('functionName');
        var data = document.getElementsByClassName('selected');
        var moduleData = data[0].getElementsByClassName('module')[0].getAttribute('module-value');
        var permission = [];

        for (var i = 0; i < radioElement.length; i++) {
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

        for (var i = 0; i < rolePermissions.length; i++) {
            if (rolePermissions[i].module === moduleData) {
                rolePermissions.splice(i, 1);
                break;
            }
        }
        rolePermissions.push(rolePermission);
        Template.instance().reactive.set('rolePermission', rolePermissions);
    },
    'click #access-all': function () {
        var accessAll = document.getElementById('access-all');
        var radioElement = document.getElementsByClassName('functionName');
        var data = document.getElementsByClassName('selected');


        if (accessAll.checked) {
            var moduleListSelected = document.getElementsByClassName('module-list');
            var permission = [];
            var moduleList = [];

            for (var r = 0; r < radioElement.length; r++) {
                radioElement[r].checked = true;
                radioElement[r].setAttribute('disabled', true);
            }

            for (var m = 0; m < moduleListSelected.length; m++) {
                moduleListSelected[m].classList.add('selected');
            }

            for (var i = 0; i < data.length; i++) {
                var moduleElement = data[i].getElementsByClassName('module');
                for (var o = 0; o < moduleElement.length; o++) {
                    var moduleValue = moduleElement[o].getAttribute('module-value');
                    moduleList.push(moduleValue);
                }
            }

            var rolePermission = [{
                permissions: permission
            }];

            for (var a = 0; a < moduleList.length; a++) {
                var moduleData = moduleList[a];
                for (var b = 0; b < radioElement.length; b++) {
                    if (radioElement[b].checked) {
                        var permissions = moduleData + '.' + radioElement[b].value;
                        permission.push(permissions);
                    }
                }
            }
            Template.instance().reactive.set('rolePermission', rolePermission);
        } else {
            var tar = document.getElementsByTagName('tr');

            for (var e = 0; e < tar.length; e++) {
                tar[e].classList.remove('selected');
            }

            var row = document.getElementsByClassName('module-list')[0];
            row.classList.add('selected');
            var data = document.getElementsByClassName('selected');
            var moduleData = data[0].getElementsByClassName('module')[0].getAttribute('module-value');

            if (moduleData == 'dashboard') {
                for (var k = 0; k < radioElement.length; k++) {
                    radioElement[k].checked = true;
                    radioElement[k].setAttribute('disabled', true);
                }
            }

            rolePermissions = [];

            Template.instance().reactive.set('rolePermission', rolePermissions);
        }
    },
    'submit form': function (event) {
        event.preventDefault();
        const target = event.target;

        var role = target.role.value;
        var descriptions = target.description.value;
        var element = document.getElementById('module');
        var alertMessage = document.getElementById('alert-message');
        var roleType = element.options[element.selectedIndex].value;
        var permissionsData = [];
        var permissionsList = [];
        var module = [];

        var rolePermission = Template.instance().reactive.get('rolePermission');

        rolePermission.forEach(element => {
            var elementModules = element.module;
            module.push(elementModules);
        });

        if (roleType === 'admin') {
            if (rolePermission.length == 0) {
                var permissionDefaultData = ['dashboard.create', 'dashboard.view', 'dashboard.edit', 'dashboard.delete', 'roles.view', 'users.create', 'users.view'];
                for (var i = 0; i < permissionDefaultData.length; i++) {
                    permissionsList.push(permissionDefaultData[i]);
                }
            } else if (module != 0) {
                var usersDashboardDefaultData = ['users.create', 'users.view', 'dashboard.create', 'dashboard.view', 'dashboard.edit', 'dashboard.delete'];
                var rolesDashboardDefaultData = ['dashboard.create', 'dashboard.view', 'dashboard.edit', 'dashboard.delete', 'roles.view'];

                for (var i = 0; i < rolePermission.length; i++) {
                    if (rolePermission[i].module != 'users' && rolePermission[i].module != 'dashboard') {
                        for (var a = 0; a < usersDashboardDefaultData.length; a++) {
                            permissionsList.push(usersDashboardDefaultData[a]);
                        }
                    } else if (rolePermission[i].module != 'roles' && rolePermission[i].module != 'dashboard') {
                        for (var b = 0; b < rolesDashboardDefaultData.length; b++) {
                            permissionsList.push(rolesDashboardDefaultData[b]);
                        }
                    }

                    for (var key in rolePermission[i].permissions) {
                        permissionsList.push(rolePermission[i].permissions[key]);
                    }
                }
            } else {
                for (var i = 0; i < rolePermission.length; i++) {
                    for (var key in rolePermission[i].permissions) {
                        permissionsList.push(rolePermission[i].permissions[key]);
                    }
                }
            }
        } else {
            if (rolePermission.length == 0) {
                var permissionDefaultData = ['dashboard.create', 'dashboard.view', 'dashboard.edit', 'dashboard.delete'];

                for (var i = 0; i < permissionDefaultData.length; i++) {
                    permissionsList.push(permissionDefaultData[i]);

                }
            } else if (module != 0) {
                dashboardDefaultData = ['dashboard.create', 'dashboard.view', 'dashboard.edit', 'dashboard.delete'];

                for (var i = 0; i < rolePermission.length; i++) {
                    if (rolePermission[i].module != 'dashboard') {
                        for (var a = 0; a < dashboardDefaultData.length; a++) {
                            permissionsList.push(dashboardDefaultData[a]);
                        }
                    }
                    for (var key in rolePermission[i].permissions) {
                        permissionsList.push(rolePermission[i].permissions[key]);
                    }
                }
            } else {
                for (var i = 0; i < rolePermission.length; i++) {
                    for (var key in rolePermission[i].permissions) {
                        permissionsList.push(rolePermission[i].permissions[key]);
                    }
                }
            }
        }

        var roleData = {
            role: role,
            description: descriptions,
            type: roleType
        }

        for (var i = 0; i < permissionsList.length; i++) {
            var modules = permissionsList[i].split('.')[0];
            var functionName = permissionsList[i].split('.')[1];
            var permissionDatas = {
                module: modules,
                function: functionName,
                permission: roleType + '-' + modules + '.' + functionName
            }

            permissionsData.push(permissionDatas);
        }
        Meteor.call('createRoleWithPermissions', roleData, permissionsData, function(error) {
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
    'click tr': function (event) {
        event.preventDefault();
        var radioElement = document.getElementsByClassName('functionName');
        var accessAll = document.getElementById('access-all');
        var tar = document.getElementsByTagName('tr');

        if (!accessAll.checked) {

            for (var i = 0; i < radioElement.length; i++) {
                radioElement[i].checked = false;
                radioElement[i].removeAttribute('disabled');
            }

            for (var i = 0; i < tar.length; i++) {
                tar[i].classList.remove('selected');
            }

            const target = event.target.closest('tr');
            target.classList.add('selected');

            var data = document.getElementsByClassName('selected');
            var moduleData = data[0].getElementsByClassName('module')[0].getAttribute('module-value');
            rolePermissionId = FlowRouter.getParam('_id');

            var rolePermission = RolePermissions.findOne({ _id: rolePermissionId });
            var permission = rolePermission.permissions;

            if (moduleData == 'dashboard') {
                for (var k = 0; k < radioElement.length; k++) {
                    radioElement[k].checked = true;
                    radioElement[k].setAttribute('disabled', true);
                }
            } else if (moduleData == 'roles') {
                document.getElementById('view').checked = true;
                document.getElementById('view').setAttribute('disabled', true);
            } else if (moduleData == 'users') {
                document.getElementById('create').checked = true;
                document.getElementById('view').checked = true;
                document.getElementById('create').setAttribute('disabled', true);
                document.getElementById('view').setAttribute('disabled', true);
            }

            permission.forEach(element => {
                if (element.module === moduleData) {
                    document.getElementById(element.function).checked = true;
                }
            })
        }
    },
    'change .functionName': function () {
        var radioElement = document.getElementsByClassName('functionName');
        var data = document.getElementsByClassName('selected');
        var moduleData = data[0].getElementsByClassName('module')[0].getAttribute('module-value');
        var permission = [];

        for (var i = 0; i < radioElement.length; i++) {
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

        for (var i = 0; i < rolePermissions.length; i++) {
            if (rolePermissions[i].module === moduleData) {
                rolePermissions.splice(i, 1);
                break;
            }
        }

        rolePermissions.push(rolePermission);
        Template.instance().reactive.set('rolePermission', rolePermissions);
    },
    'click #access-all': function () {
        var accessAll = document.getElementById('access-all');
        var radioElement = document.getElementsByClassName('functionName');
        var data = document.getElementsByClassName('selected');

        if (accessAll.checked) {
            var moduleListSelected = document.getElementsByClassName('module-list');
            var permission = [];
            var moduleList = [];

            for (var r = 0; r < radioElement.length; r++) {
                radioElement[r].checked = true;
                radioElement[r].setAttribute('disabled', true);
            }

            for (var m = 0; m < moduleListSelected.length; m++) {
                moduleListSelected[m].classList.add('selected');
            }

            for (var i = 0; i < data.length; i++) {
                var moduleElement = data[i].getElementsByClassName('module');
                for (var o = 0; o < moduleElement.length; o++) {
                    var moduleValue = moduleElement[o].getAttribute('module-value');
                    moduleList.push(moduleValue);
                }
            }

            var rolePermission = [{
                permissions: permission
            }];

            for (var a = 0; a < moduleList.length; a++) {
                var moduleData = moduleList[a];
                for (var b = 0; b < radioElement.length; b++) {
                    if (radioElement[b].checked) {
                        var permissions = moduleData + '.' + radioElement[b].value;
                        permission.push(permissions);
                    }
                }
            }

            Template.instance().reactive.set('rolePermission', rolePermission);
        } else {
            var tar = document.getElementsByTagName('tr');

            for (var e = 0; e < tar.length; e++) {
                tar[e].classList.remove('selected');
            }

            var row = document.getElementsByClassName('module-list')[0];
            row.classList.add('selected');
            var data = document.getElementsByClassName('selected');
            var moduleData = data[0].getElementsByClassName('module')[0].getAttribute('module-value');

            if (moduleData == 'dashboard') {
                for (var k = 0; k < radioElement.length; k++) {
                    radioElement[k].checked = true;
                    radioElement[k].setAttribute('disabled', true);
                }
            }

            rolePermissions = [];

            Template.instance().reactive.set('rolePermission', rolePermissions);
        }
    },
    'submit form': function (event) {
        event.preventDefault();
        const target = event.target;

        var role = target.role.value;
        var descriptions = target.description.value;
        var element = document.getElementById('module');
        var alertMessage = document.getElementById('alert-message');
        var roleType = element.options[element.selectedIndex].value;
        var permissionsData = [];

        var rolePermission = Template.instance().reactive.get('rolePermission');
        var rolePermissionId = Template.instance().reactive.get('roleId');

        var rolePermissionCollection = RolePermissions.findOne({ _id: rolePermissionId });
        var permissions = rolePermissionCollection.permissions;

        var permissionsList = [];
        var permissionDefaultData = [];
        var adminUsersDashboard = [];
        var adminRolesDashboard = [];
        var userDashboardReports = [];
        var userDashboardIssue = [];
        var module = [];

        rolePermission.forEach(element => {
            var elementModules = element.module;
            module.push(elementModules);
        });

        //admin role type
        // get all data under or admin role type
        permissions.forEach(element => {
            var dataElement = element.permission
            var module = dataElement.split('-')[1];
            permissionDefaultData.push(module);
        });

        permissions.forEach(element => {
            var dataElement = element.permission

            if (element.module == 'dashboard') {
                var module = dataElement.split('-')[1];
                adminUsersDashboard.push(module);
            }
            if (element.module == 'users') {
                var module = dataElement.split('-')[1];
                adminUsersDashboard.push(module);
            }
        });

        permissions.forEach(element => {
            var dataElement = element.permission

            if (element.module == 'dashboard') {
                var module = dataElement.split('-')[1];
                adminRolesDashboard.push(module);
            }
            if (element.module == 'roles') {
                var module = dataElement.split('-')[1];
                adminRolesDashboard.push(module);
            }
        });

        //users roletype
        // get all data under or user role type
        permissions.forEach(element => {
            var dataElement = element.permission

            if (element.module == 'dashboard') {
                var module = dataElement.split('-')[1];
                userDashboardReports.push(module);
            }
            if (element.module == 'reports') {
                var module = dataElement.split('-')[1];
                userDashboardReports.push(module);
            }
        });

        permissions.forEach(element => {
            var dataElement = element.permission

            if (element.module == 'dashboard') {
                var module = dataElement.split('-')[1];
                userDashboardIssue.push(module);
            }
            if (element.module == 'issue-tracker') {
                var module = dataElement.split('-')[1];
                userDashboardIssue.push(module);
            }
        });
        //end

        if (roleType === 'admin') {
            if (rolePermission.length == 0) {
                for (var i = 0; i < permissionDefaultData.length; i++) {
                    permissionsList.push(permissionDefaultData[i]);
                }
            } else if (module != 0) {
                for (var i = 0; i < rolePermission.length; i++) {
                    if (rolePermission[i].module != 'users' && rolePermission[i].module != 'dashboard') {
                        for (var a = 0; a < adminUsersDashboard.length; a++) {
                            permissionsList.push(adminUsersDashboard[a]);
                        }
                    } else if (rolePermission[i].module != 'roles' && rolePermission[i].module != 'dashboard') {
                        for (var b = 0; b < adminRolesDashboard.length; b++) {
                            permissionsList.push(adminRolesDashboard[b]);
                        }
                    }

                    for (var key in rolePermission[i].permissions) {
                        permissionsList.push(rolePermission[i].permissions[key]);
                    }
                }
            } else {
                for (var i = 0; i < rolePermission.length; i++) {
                    for (var key in rolePermission[i].permissions) {
                        permissionsList.push(rolePermission[i].permissions[key]);
                    }
                }
            }
        } else {
            if (rolePermission.length == 0) {
                var permissionDefaultData = ['dashboard.create', 'dashboard.view', 'dashboard.edit', 'dashboard.delete'];

                for (var i = 0; i < permissionDefaultData.length; i++) {
                    permissionsList.push(permissionDefaultData[i]);

                }
            } else if (module != 0) {
                for (var i = 0; i < rolePermission.length; i++) {
                    if (rolePermission[i].module != 'dashboard' && rolePermission[i].module != 'reports') {
                        for (var a = 0; a < userDashboardReports.length; a++) {
                            permissionsList.push(userDashboardReports[a]);
                        }
                    } else if (rolePermission[i].module != 'dashboard' && rolePermission[i].module != 'issue-tracker'){
                        for (var b = 0; b < userDashboardReports.length; b++) {
                            permissionsList.push(userDashboardReports[b]);
                        }
                    }
                    for (var key in rolePermission[i].permissions) {
                        permissionsList.push(rolePermission[i].permissions[key]);
                    }
                }
            } else {
                for (var i = 0; i < rolePermission.length; i++) {
                    for (var key in rolePermission[i].permissions) {
                        permissionsList.push(rolePermission[i].permissions[key]);
                    }
                }
            }
        }

        var roleData = {
            role: role,
            description: descriptions,
            type: roleType
        };

        for (var i = 0; i < permissionsList.length; i++) {
            var modules = permissionsList[i].split('.')[0];
            var functionName = permissionsList[i].split('.')[1];
            var permissionDatas = {
                module: modules,
                function: functionName,
                permission: roleType + '-' + modules + '.' + functionName
            }

            permissionsData.push(permissionDatas);
        }

        var rolePermissionData = {
            permissionsData,
            roleData
        };

        Meteor.call('updateRoleWithPermissions', rolePermissionId, rolePermissionData, function(error) {
            if(error) {
                Session.set('failure', error.reason);
                alertMessage.style.display = 'block';
            } else {
                Session.set('success', 'Successfully Updated');
                FlowRouter.go('/admin/roles-list');
            }
        });
    }
});
