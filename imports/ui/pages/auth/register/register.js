// Import(s)
import './register.html';

// Template Events
Template.Auth_register_page.events({
  'submit .register-form'(event) {
    event.preventDefault();

    const target = event.target;

    var emailAddress = target.email.value;
    var password = target.password.value;
    var confirmPassword = target.confirmPassword.value;
    var firstName = target.firstName.value;
    var lastName = target.lastName.value;
    var gender = target.gender.value;
    var role = target.role.value;
    var userName = target.userName.value;

    var emailAddressFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    // Validation before creating user
    if(!emailAddress.match(emailAddressFormat)) {
      document.getElementById("error-msg").innerHTML = "Invalid email address format.";
    } else if(password.trim().length < 8) {
      document.getElementById("error-msg").innerHTML = "Password must be at least 8 characters.";
    } else if(password !== confirmPassword) {
      document.getElementById("error-msg").innerHTML = "Passwords don't match.";
    } else {

      var userData = {
        email: emailAddress,
        password: password,
        role: role,
        profile: {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          userName: userName,
          role:role
        }
      }

      var profile = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        userName: userName,
        role: role
      }

      Accounts.createUser({
        email: emailAddress,
        password: password,
        profile: profile,
      });
      console.log(userData, profile)
      Meteor.call('users.insert', userData, profile, function(error) {
        if(error) {
          document.getElementById('error-msg').innerHTML = error.reason;
        } else {
          //
        }
      });
      FlowRouter.go('/');
    }
  },
});