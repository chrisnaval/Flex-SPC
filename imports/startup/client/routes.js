// Meteor Package(s)
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Import(s)
import '../../ui/layouts/body/body.js';
import '../../ui/pages/auth/login/login.js';
import '../../ui/pages/auth/register/register.js';
import '../../ui/pages/dataentry/item/item.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/items/item.js';
import '../../ui/pages/reports/pareto/pareto.js';
import '../../ui/pages/users/list/list.js';
import '../../ui/pages/users/permission/permission.js';
import '../../ui/pages/users/profile/profile.js';
import '../../ui/pages/users/update/update.js';
import '../../ui/pages/users/role/role-list.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/components/sample-graph/sample-graph.js';

// Set up all routes in the app
FlowRouter.route("/", {
  name: "home-page",
  action() {
    if(Meteor.userId()) {
      BlazeLayout.render("App_body", { 
        main: "App_home_page"
      });
    } else {
      FlowRouter.go("/login");
    }
  },
});
FlowRouter.route("/dataentry", {
  name: "dataentry-page",
  action() {
    if(Meteor.userId()) {
      BlazeLayout.render("App_body", { 
        main: "App_dataentry_item_page"
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
      BlazeLayout.render("App_body", { 
        main: "Auth_login_page",
      });
    } else {
      FlowRouter.go("/");
    }
  },
});
FlowRouter.route("/sample-graph", {
  name: "graph-page",
  action() {
    if(!Meteor.userId()) {
      BlazeLayout.render("App_home_page", { 
        headerAuth: "",
        main: "Sample_graph",
        footerAuth: ""
      });
    } else {
      FlowRouter.go("/");
    }
  },
});

FlowRouter.route("/edit-sample-graph/:_id", {
  name: "edit-graph-page",
  action() {
    if(!Meteor.userId()) {
      BlazeLayout.render("App_home_page", { 
        headerAuth: "",
        main: "Edit_Sample_Graph",
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
      BlazeLayout.render("App_body", { 
        main: "Auth_register_page",
      });
    } else {
      FlowRouter.go("/");
    }
  },
});
FlowRouter.route("/user", {
  name: "user-page",
  action() {
    if(Meteor.userId()) {
      BlazeLayout.render("App_body", { 
        main: "App_user_list_page",
      });
    } else {
      FlowRouter.go("/");
    }
  },
});
FlowRouter.route("/user/profile", {
  name: "user-profile-page",
  action() {
    if(Meteor.userId()) {
      BlazeLayout.render("App_body", { 
        main: "App_profile_page",
      });
    } else {
      FlowRouter.go("/login");
    }
  },
});
FlowRouter.route("/user/role", {
  name: "user-role-page",
  action() {
    if(Meteor.userId()) {
      BlazeLayout.render("App_body", { 
        main: "App_role_page"
      });
    } else {
      FlowRouter.go("/login");
    }
  },
});
FlowRouter.route("/user/role-permission", {
  name: "user-role-page",
  action() {
    if(Meteor.userId()) {
      BlazeLayout.render("App_body", { 
        main: "App_permission_page",
      });
    } else {
      FlowRouter.go("/login");
    }
  },
});
FlowRouter.route("/user/update", {
  name: "user-update-page",
  action() {
    if(Meteor.userId()) {
      BlazeLayout.render("App_body", { 
        main: "App_update_page",
      });
    } else {
      FlowRouter.go("/login");
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

