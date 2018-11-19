// Import(s)
import './register.html';

// Template Events
Template.Auth_register_page.events({
  'submit .register-form'(event) {
    event.preventDefault();

    const target = event.target;

    // var fullName = target.fullName.value;
    var emailAddress = target.email.value;
    var password = target.password.value;
    var confirmPassword = target.confirmPassword.value;

    var emailAddressFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    // Validation before creating user
    if(!emailAddress.match(emailAddressFormat)) {
      document.getElementById("error-msg").innerHTML = "Invalid email address format.";
    } else if(password.trim().length < 8) {
      document.getElementById("error-msg").innerHTML = "Password must be at least 8 characters.";
    } else if(password !== confirmPassword) {
      document.getElementById("error-msg").innerHTML = "Passwords don't match.";
    } else {
      var username = emailAddress.split("@");
      username = username[0];

      // Creates a new record of user
      Accounts.createUser({
        email: emailAddress,
        username: username,
        password: password
      }, (error) => {
        if(error) {
          document.getElementById("error-msg").innerHTML = error.reason;
        } else {
          // var userData = {
          //   userId: Meteor.userId(),
          //   fullName: fullName,
          //   address: ""
          // };

          // // Insert user details
          // Meteor.call('userDetails.insert', userData, (error) => {
          //   if(error) {
          //     alert(error.error);
          //   } else {
          //     FlowRouter.go("/");
          //   }
          // });
        }
      });

      FlowRouter.go("/");
    }
  },
});
