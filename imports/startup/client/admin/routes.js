// Meteor Package(s)
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Component(s)
import '../../../ui/components/dashboard/dashboard.js';

// Layout(s)
import '../../../ui/layouts/body/body.js';
import '../../../ui/layouts/headers/admin/header.js';
import '../../../ui/layouts/sidebars/admin/sidebar.js';

// Page(s)
import '../../../ui/pages/admin/home/home.js';
import '../../../ui/pages/admin/users/list/list.js';
import '../../../ui/pages/admin/users/update/update.js';
import '../../../ui/pages/admin/users/create/create.js';

// Set up all routes for the admin side
FlowRouter.route('/admin', {
    name: 'admin-home-page',
    action() {
        if(Meteor.userId()) {
            BlazeLayout.render('Admin_home', {
                header: 'Admin_header',
                sidebar: 'Admin_sidebar',
                main: 'Admin_dashboard'
            });
        } else {
            FlowRouter.go('/login');
        }
    },
});

FlowRouter.route('/admin/user', {
    name: 'admin-user-list-page',
    action() {
        if(Meteor.userId()) {
            BlazeLayout.render('Admin_home', {
                header: 'Admin_header',
                sidebar: 'Admin_sidebar',
                main: 'Users_list'
            });
        } else {
            FlowRouter.go('/login');
        }
    },
});

FlowRouter.route('/admin/user/create', {
    name: 'admin-user-create-page',
    action() {
        if(Meteor.userId()) {
            BlazeLayout.render('Admin_home', {
                header: 'Admin_header',
                sidebar: 'Admin_sidebar',
                main: 'Users_create'
            });
        } else {
            FlowRouter.go('/login');
        }
    },
});

FlowRouter.route('/admin/user/update/:_id', {
    name: 'admin-user-update-page',
    action() {
        if(Meteor.userId()) {
            BlazeLayout.render('Admin_home', {
                header: 'Admin_header',
                sidebar: 'Admin_sidebar',
                main: 'Users_update'
            });
        } else {
            FlowRouter.go('/login');
        }
    },
});