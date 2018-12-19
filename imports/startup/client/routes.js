// Meteor Package(s)
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Component(s)
import '../../ui/components/dashboard/dashboard.js';
import '../../ui/components/forms/configuration.js';
import '../../ui/components/list/product.js';

// Testing Only
import '../../ui/pages/configurationTesting/configurationTesting.js';

// Layout(s)
import '../../ui/layouts/body/body.js';
import '../../ui/layouts/headers/header.js';
import '../../ui/layouts/sidebars/sidebar.js';

// For testing Only
import '../../ui/pages/auth/login/login.js';

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

FlowRouter.route('/product', {
    name: 'update-configuration-page',
    action() {
        if(Meteor.userId()) {
            BlazeLayout.render('Home', {
                header: 'Header',
                sidebar: 'Sidebar',
                main: 'Product_list'
            });
        } else {
            FlowRouter.go('/login');
        }
    },
});

FlowRouter.route('/product/configuration', {
    name: 'configuration-page',
    action() {
        if(Meteor.userId()) {
            BlazeLayout.render('Home', {
                header: 'Header',
                sidebar: 'Sidebar',
                main: 'Configuration'
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

// Testing Only
FlowRouter.route('/configurationTesting', {
    name: 'configuration-testing',
    action() {
        if(!Meteor.userId()) {
            BlazeLayout.render('App_body', {
                main: 'Configuration_Testing',
            });
        } else {
            FlowRouter.go('/');
        }
    },
});