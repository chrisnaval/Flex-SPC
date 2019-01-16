import './alert-message.html';

//meteor packages
import { Session } from 'meteor/session';

Template.Alert_message.onCreated(function() {
    setTimeout(function(){ 
        document.getElementById('alert-message').style.opacity = '0';
        Session.keys = {}
    }, 3000);
});

Template.Alert_message.helpers({
    failure() {
        return Session.get('failure');
    },
    success() {
        return Session.get('success');
    }
});
