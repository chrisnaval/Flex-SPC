import './forms.html';

//create user 
Template.Users_create.events({
    'submit .createuser-form'(event) {
        event.preventDefault();
        const target = event.target;

        var firstName = target.firstName.value;
        var lastName = target.lastName.value;
        var address = target.address.value;
        var emailAddress = target.emailAddress.value;
        var password = target.emailAddress.value;

        var emailAddressFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!target.emailAddress.value.match(emailAddressFormat)) {
            document.getElementById('error-msg').innerHTML = 'Invalid email address format.';
        } else if (target.password.value.trim().length < 8) {
            document.getElementById('error-msg').innerHTML = 'Password must be at least 8 characters.';
        } else if (target.password.value !== target.confirmPassword.value) {
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
    update_user() {
        var user_id = FlowRouter.getParam('_id');
        return Meteor.users.findOne({
            _id: user_id,
        });
    },
});