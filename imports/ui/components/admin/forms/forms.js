import './forms.html';

//create user 
Template.Users_create.events({
    'submit .createuser-form'(event) {
        event.preventDefault();
        const target = event.target;
        var emailAddressFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!target.Email.value.match(emailAddressFormat)) {
            document.getElementById('error-msg').innerHTML = 'Invalid email address format.';
        } else if (target.Password.value.trim().length < 8) {
            document.getElementById('error-msg').innerHTML = 'Password must be at least 8 characters.';
        } else if (target.Password.value !== target.ConfirmPassword.value) {
            document.getElementById('error-msg').innerHTML = 'Password dont match.';
        } else {
            var profile = {
                firstName: target.FirstName.value,
                lastName: target.LastName.value,
                userType: target.UserType.value,
                address: target.Address.value
            }
            var userData = {
                email: target.Email.value,
                password: target.Password.value,
                profile: {
                    firstName: target.FirstName.value,
                    lastName: target.LastName.value,
                    userType: target.UserType.value,
                    address: target.Address.value
                }
            }

            Accounts.createUser({
                email: target.Email.value,
                password: target.Password.value,
                profile: profile,
            });
            
            Meteor.call('users.insert', userData, profile, function (error) {
                if (error) {
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

Template.Users_update.events({
    'submit .user-update'(event) {
        event.preventDefault();
        const target = event.target;
        FlowRouter.go('/admin/user');
    }
});