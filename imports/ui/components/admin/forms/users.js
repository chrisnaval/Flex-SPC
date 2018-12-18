import './users.html';

import { ReactiveDict } from 'meteor/reactive-dict';

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
                role: {
                    _id: "",
                    role: "",
                }
            };

            var userData = {
                username: username,
                emailAddress: emailAddress,
                password: password,
                userProfile
            };

            Meteor.call('users.insert', userData, function(error) {
                if(error) {
                    document.getElementById('error-msg').innerHTML = error.reason;
                }
            });
        }
        FlowRouter.go('/admin/user');
    },
});

//user update
Template.Users_update.onCreated(function () {
    Meteor.subscribe('users.all');
});

Template.Users_update.helpers({
    getUserById() {
        var userId = FlowRouter.getParam('_id');
        return Meteor.users.findOne({
            _id: userId,
        });
    },
});