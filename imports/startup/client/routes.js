// Meteor Package(s)
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Import(s)
import '../../ui/layouts/body/body.js';
import '../../ui/pages/auth/login/login.js';
import '../../ui/pages/admin/home/dashboard.js';
import '../../ui/pages/admin/users/list/list.js';
import '../../ui/pages/admin/users/update/update.js';
import '../../ui/pages/admin/users/create/create.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
    name: 'home-page',
    action() {
        if (Meteor.userId()) {
            BlazeLayout.render('App_body', {
                main: 'Home'
            });
        } else {
            FlowRouter.go('/login');
        }
    },
});

FlowRouter.route('/admin', {
    name: 'admin-home-page',
    action() {
        if (Meteor.userId()) {
            BlazeLayout.render('App_body', {
                main: 'Admin-dashboard'
            });
        } else {
            FlowRouter.go('/login');
        }
    },
});

FlowRouter.route('/admin/user', {
    name: 'admin-user-list-page',
    action() {
        if (Meteor.userId()) {
            BlazeLayout.render('App_body', {
                main: 'User-list'
            });
        } else {
            FlowRouter.go('/login');
        }
    },
});

FlowRouter.route('/admin/user/create', {
    name: 'admin-user-create-page',
    action() {
        if (Meteor.userId()) {
            BlazeLayout.render('App_body', {
                main: 'User-create'
            });
        } else {
            FlowRouter.go('/login');
        }
    },
});

FlowRouter.route('/admin/user/update/:_id', {
    name: 'admin-user-update-page',
    action() {
        if (Meteor.userId()) {
            BlazeLayout.render('App_body', {
                main: 'User-update',
            });
        } else {
            FlowRouter.go('/login');
        }
    },
});

FlowRouter.route('/login', {
    name: 'login-page',
    action() {
        if (!Meteor.userId()) {
            BlazeLayout.render('App_body', {
                main: 'Auth_login_page',
            });
        } else {
            FlowRouter.go('/');
        }
    },
});

FlowRouter.notFound = {
    action() {
        BlazeLayout.render('App_body', {
            main: 'App_notFound_page'
        });
    },
};
