// Import(s)
import './login.html';

// Template Events
Template.Auth_login_page.events({
  'submit .login-form': function(event) {
    event.preventDefault();

    const target = event.target;
    var emailAddress = target.email.value;
    var password = target.password.value;

    Meteor.loginWithPassword(emailAddress, password, (error) => {
      if(error) {
        document.getElementById("error-msg").innerHTML = error.reason;
      } else {
        FlowRouter.go("/");
      }
    });
  },
});
