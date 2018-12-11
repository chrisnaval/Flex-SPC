// Meteor Package(s)
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Component(s)
import '../../ui/components/dashboard/dashboard.js';

// Layout(s)
import '../../ui/layouts/body/body.js';
import '../../ui/layouts/headers/header.js';
import '../../ui/layouts/sidebars/sidebar.js';

// Page(s)
import '../../ui/pages/auth/login/login.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
    name: 'home-page',
    action() {
        if(Meteor.userId()) {
            BlazeLayout.render('Home', {
                header: 'Header',
                sidebar: 'Sidebar',
                main: 'Dashboard'
            });
        } else {
            FlowRouter.go('/login');
        }
    },
});

FlowRouter.route('/login', {
    name: 'login-page',
    action() {
        if(!Meteor.userId()) {
            BlazeLayout.render('App_body', {
                main: 'Auth_login_page',
            });
        } else {
            FlowRouter.go('/');
        }
    },
});

// Not Found
FlowRouter.notFound = {
    action() {
        BlazeLayout.render('App_body', {
            main: 'App_notFound_page'
        });
    },
};