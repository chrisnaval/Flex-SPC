import './users.html';

import { ReactiveDict } from 'meteor/reactive-dict';

// Import(s) testing only
import { UserProfiles } from '/imports/api/collections/users/userProfiles.js';

//user create
Template.Users_create.onCreated(function() {
    this.show = new ReactiveDict();
    this.show.set('showtable', false);
});

Template.Users_create.helpers({
    showtable() {
        return Template.instance().show.get('showtable');
    }
});

Template.Users_update.onCreated(function () {
    Meteor.subscribe('usersProfile.all');
});

// UserProfile instead of Meteor.users
Template.Users_update.helpers({
    getUserById() {
        // var userId = FlowRouter.getParam('_id');
        return UserProfiles.find({
            // _id: userId,
        });
    },
});

Template.Users_create.events({
    'click .choose'(event, template) {
        event.preventDefault();
        template.show.set('showtable', true);
    },
    'click tr'(event, template){
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
    'submit .createuser-form'(event) {
        event.preventDefault();
        const target = event.target;

        var firstName = target.firstName.value;
        var lastName = target.lastName.value;
        var address = target.address.value;
        var contactNo = target.contactNo.value;
        var emailAddress = target.emailAddress.value;
        var password = target.password.value;
        var confirmPassword = target.confirmPassword.value;
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

            var userProfile = {
                firstName: firstName,
                lastName: lastName,
                address: address,
                contactNo: contactNo,
<<<<<<< HEAD
                type: "user",
=======
>>>>>>> a8a0628705ffe84924858190c0ae815479e315ed
                role: {
                    _id: "",
                    role: "",
                }
            };
            
            var userData = {
                emailAddress: emailAddress,
                username: username,
                password: password,
                userProfile
            };
<<<<<<< HEAD
            console.log(userData);
=======
            console.log(userProfile, userData);
>>>>>>> a8a0628705ffe84924858190c0ae815479e315ed
            Meteor.call('users.insert', userData, function(error) {
                if(error) {
                    document.getElementById('error-msg').innerHTML = error.reason;
                }
            });
        }
        FlowRouter.go('/admin/user');
    },
});

// Testing Only
Template.Users_update.events({
    'submit .user-update'(event) {
        event.preventDefault();
        const target = event.target;
    
        var firstName = target.firstName.value;
        var lastName = target.lastName.value;
        var contactNo = target.contactNo.value;
        var address = target.address.value;

        // var userProfile = {
        //     firstName: firstName,
        //     lastName: lastName,
        //     address: address,
        //     contactNo: contactNo,
        //     role: {
        //         _id: "",
        //         role: "",
        //     }
        // };
    
        var userData = {
            firstName: firstName,
            lastName: lastName,
            contactNo: contactNo,
            address: address,
            role: {
                _id: "",
                role: "",
            }
            // userProfile
        }
        console.log(userData);
        var userProfileId = FlowRouter.getParam("_id");
        Meteor.call('users.update',userData, userProfileId, function(error) {
            if(error) {
                document.getElementById('error-msg').innerHTML = error.reason;
            }
        });
    }
});