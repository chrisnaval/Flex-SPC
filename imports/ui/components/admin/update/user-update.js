import './user-update.html';

Template.User_update.onCreated(function () {
    Meteor.subscribe('users.all');
});

Template.User_update.helpers({
    update_user() {
        var user_id = FlowRouter.getParam('_id');
        return Meteor.users.findOne({
            _id: user_id,
        });
    },
});

Template.User_update.events({
    'submit .user-update'(event) {
        event.preventDefault();
        const target = event.target;
        FlowRouter.go('/admin/user');
    }
});
