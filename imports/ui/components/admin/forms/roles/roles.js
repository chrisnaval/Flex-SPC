import './roles.html'

// Collection(s)
import { AppModules } from '/imports/api/collections/appModules/appModules.js';

// Constants
import { moduleFunctions } from '/lib/constants.js';


Template.Roles_create.onCreated(function () {
    Meteor.subscribe('appModules.all');
});

// UserProfile instead of Meteor.users
Template.Roles_create.helpers({
    getModuleData() {
        return AppModules.find({});
    },
});

Template.Roles_create.events({
    'click #createrole-form'(event) {
        event.preventDefault();
        const target = event.target;

        var roleData = {
            role: "User",
            description: "This type of user is only can make user and can edit their Profiles"
        };
        
        var permissionData = [
            {
                moduleName: "dashboard",
                function: "Create",
                permission: "user-dashboard.Create"
            },
            {
                moduleName: "dashboard",
                function: "Update",
                permission: "user-dashboard.Update"
            },
            {
                moduleName: "dashboard",
                function: "Delete",
                permission: "user-dashboard.Delete"
            },
            {
                moduleName: "dashboard",
                function: "Read",
                permission: "user-dashboard.Read"
            },
        ];
        console.log(permissionData);

        Meteor.call('rolePermissions.insert', roleData, [permissionData], function(error, response) {
            if(error) {
                document.getElementById('error-msg').innerHTML = error.reason;
            } else {
                console.log(response);
            }
        });
    },
});