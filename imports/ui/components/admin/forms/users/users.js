import './users.html';

// Meteor Package(s)
import { ReactiveDict } from 'meteor/reactive-dict';

// Mongo Collection(s)
import { Roles } from '/imports/api/collections/roles/roles.js';

// Template Created
Template.Users_create.onCreated(function() {
    this.show = new ReactiveDict();
    this.show.set('showtable', false);

    // Autorun
    this.autorun(function() {
        Meteor.subscribe('roles.all', function() {
            Session.set('roles', Roles.find({
                role: {
                    $ne: "Super Administrator"
                },
                type: {
                    $eq: "admin"
                }
            }).fetch());
        });
    });
});

Template.Users_update.onCreated(function () {
    this.state = new ReactiveDict();
    this.state.set('userId', FlowRouter.getParam('_id'));

    // Autorun
    this.autorun(function() {
        Meteor.subscribe('users.all');
        Meteor.subscribe('roles.all', function() {
            Session.set('roles', Roles.find({
                role: {
                    $ne: "Super Administrator"
                },
                type: {
                    $eq: "admin"
                }
            }).fetch());
        });
    });
});

// Template Rendered
Template.Users_create.onRendered(function() {
     // Autorun
     this.autorun(function() {
        Meteor.subscribe('roles.all', function() {
            Session.set('roles', Roles.find({
                role: {
                    $ne: "Super Administrator"
                },
                type: {
                    $eq: "admin"
                }
            }).fetch());
        });
    });
});

Template.Users_update.onRendered(function() {
     // Autorun
     this.autorun(function() {
        Meteor.subscribe('users.all');
        Meteor.subscribe('roles.all', function() {
            Session.set('roles', Roles.find({
                role: {
                    $ne: "Super Administrator"
                },
                type: {
                    $eq: "admin"
                }
            }).fetch());
        });
    });
});

// Template Helper(s)
Template.Users_create.helpers({
    roles() {
        return Session.get('roles');
    },
});

Template.Users_update.helpers({
    roles() {
        return Roles.find({
            role: {
                $ne: "Super Administrator"
            },
        });
    },
    getUserById() {
        return Meteor.users.findOne({
            _id: Template.instance().state.get('userId'),
        });
    },
    getUserEmailById() {
        var user = Meteor.users.findOne({
            _id: Template.instance().state.get('userId'),
        });

        return user.emails[0].address;
    },
});

Template.Users_create.events({
    'change #user-type': function(event) {
        const target = event.target;

        var userType = target.options[target.selectedIndex].value;
        if(userType == "admin") {
            Session.set('roles', Roles.find({
                role: {
                    $ne: "Super Administrator"
                },
                type: {
                    $eq: "admin"
                }
            }).fetch());
        } else {
            Session.set('roles', Roles.find({
                role: {
                    $ne: "Super Administrator"
                },
                type: {
                    $eq: "user"
                }
            }).fetch());
        }
    },
    'click .choose': function(event, template) {
        event.preventDefault();
        template.show.set('showtable', true);
    },
    'click tr': function(event, template){
        var tar = document.getElementsByTagName('tr');

        for(var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
        }

        const target = event.target.closest('tr');
        target.classList.add('selected');

        var data = document.getElementsByClassName("selected");
        var data_value = data[0].getElementsByClassName("role")[0].innerText;
        document.getElementById("role").value = data_value;

        template.show.set('showtable', false);
    },
    'submit form': function(event) {
        event.preventDefault();
        const target = event.target;

        var firstName = target.firstName.value;
        var lastName = target.lastName.value;
        var address = target.address.value;
        var contactNo = target.contactNo.value;
        var emailAddress = target.emailAddress.value;
        var password = target.password.value;
        var confirmPassword = target.confirmPassword.value;

        var userType = target.userType;
        var userType = userType.options[userType.selectedIndex].value;

        var role = target.role.value;

        var emailAddressFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!emailAddress.match(emailAddressFormat)) {
            document.getElementById('error-msg').innerHTML = 'Invalid email address format.';
        } else if(password.trim().length < 8) {
            document.getElementById('error-msg').innerHTML = 'Password must be at least 8 characters.';
        } else if(password !== confirmPassword) {
            document.getElementById('error-msg').innerHTML = 'Password dont match.';
        } else {
            var username = emailAddress.split("@");
            username = username[0];

            // Find specific role to get the whole document
            role = Roles.findOne({ role: role });

            var userProfile = {
                firstName: firstName,
                lastName: lastName,
                address: address,
                contactNo: contactNo,
                type: userType,
                role
            };
            
            var userData = {
                emailAddress: emailAddress,
                username: username,
                password: password,
                userProfile
            };

            Meteor.call('users.insert', userData, function(error) {
                if(error) {
                    document.getElementById('error-msg').innerHTML = error.reason;
                }
            });
            
            FlowRouter.go('/admin/users-list');
        }
    },
});

Template.Users_update.events({
    'click .choose': function(event, template) {
        event.preventDefault();
        template.show.set('showtable', true);
    },
    'click tr': function(event, template){
        var tar = document.getElementsByTagName('tr');

        for(var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
        }

        const target = event.target.closest('tr');
        target.classList.add('selected');

        var data = document.getElementsByClassName("selected");
        var data_value = data[0].getElementsByClassName("role")[0].innerText;
        document.getElementById("role").value = data_value;

        template.show.set('showtable', false);
    },
    'submit form': function(event) {
        event.preventDefault();
        const target = event.target;

        var firstName = target.firstName.value;
        var lastName = target.lastName.value;
        var contactNo = target.contactNo.value;
        var address = target.address.value;
        var contactNo = target.contactNo.value;
        var emailAddress = target.emailAddress.value;
        var password = target.password.value;
        var confirmPassword = target.confirmPassword.value;

        var type = target.type.value;
        var role = target.role.value;

        var emailAddressFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!emailAddress.match(emailAddressFormat)) {
            document.getElementById('error-msg').innerHTML = 'Invalid email address format.';
        } else if(password && password.trim().length < 8) {
            document.getElementById('error-msg').innerHTML = 'Password must be at least 8 characters.';
        } else if(password !== confirmPassword) {
            document.getElementById('error-msg').innerHTML = 'Password dont match.';
        } else {
            var username = emailAddress.split("@");
            username = username[0];

            // Find specific role to get the whole document
            role = Roles.findOne({ role: role });

            var userProfile = {
                firstName: firstName,
                lastName: lastName,
                address: address,
                contactNo: contactNo,
                type: type,
                role
            };
            
            var userData = {
                emailAddress: emailAddress,
                username: username,
                password: password,
                userProfile
            };

            var userId = FlowRouter.getParam("_id");
            Meteor.call('users.update', userId, userData, function(error) {
                if(error) {
                    document.getElementById('error-msg').innerHTML = error.reason;
                }
            });

            FlowRouter.go('/admin/users-list');
        }
    }
});