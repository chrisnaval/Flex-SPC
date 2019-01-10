import './alert-message.html';

//meteor packages
import { Session } from 'meteor/session';

Template.Alert_message.helpers({
    failure() {
        return Session.get('failure');
    },
    success() {
        return Session.get('success');
    }
});

Template.Alert_message.events({
   'click .close': function() {
        document.getElementById('alert-message').style.display = 'none'
        Session.keys = {}
   },
});