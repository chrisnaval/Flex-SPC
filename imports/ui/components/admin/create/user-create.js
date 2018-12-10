import './user-create.html'

Template.User_create.events({
    'submit .createuser-form'(event) {
        event.preventDefault();
        const target = event.target;
        var emailAddressFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!target.email.value.match(emailAddressFormat)) {
            document.getElementById('error-msg').innerHTML = 'Invalid email address format.';
        } else if (target.password.value.trim().length < 8) {
            document.getElementById('error-msg').innerHTML = 'Password must be at least 8 characters.';
        } else if (target.password.value !== target.confirmPassword.value) {
            document.getElementById('error-msg').innerHTML = 'Password dont match.';
        } else {
            var profile = {
                firstName: target.firstname.value,
                lastName: target.lastname.value,
                gender: target.gender.value,
                userName: target.username.value
            }
            var userData = {
                email: target.email.value,
                password: target.password.value,
                profile: {
                    firstName: target.firstname.value,
                    lastName: target.lastname.value,
                    gender: target.gender.value,
                    userName: target.username.value
                }
            }
            Accounts.createUser({
                email: target.email.value,
                password: target.password.value,
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