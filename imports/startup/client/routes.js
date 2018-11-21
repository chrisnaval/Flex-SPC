// Meteor Package(s)
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Import(s)
import '../../ui/layouts/body/body.js';
import '../../ui/layouts/headers/home/home-header.js';
import '../../ui/pages/auth/auth.html';
import '../../ui/pages/auth/login/login.js';
import '../../ui/pages/auth/register/register.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route("/", {
  name: "home-page",
  action() {
    if(!Meteor.userId()) {
      BlazeLayout.render("App_home_page", { 
        header: "Home_header",
        main: "",
        footer: ""
      });
    } else {
      FlowRouter.go("/login");
    }
  },
});

FlowRouter.route("/login", {
  name: "login-page",
  action() {
    if(!Meteor.userId()) {
      BlazeLayout.render("App_auth_page", { 
        headerAuth: "",
        mainAuth: "Auth_login_page",
        footerAuth: ""
      });
    } else {
      FlowRouter.go("/");
    }
  },
});

FlowRouter.route("/register", {
  name: "register-page",
  action() {
    if(!Meteor.userId()) {
      BlazeLayout.render("App_auth_page", { 
        headerAuth: "",
        mainAuth: "Auth_register_page",
        footerAuth: ""
      });
    } else {
      FlowRouter.go("/");
    }
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render("App_body", { 
      main: "App_notFound_page"
    });
  },
};
