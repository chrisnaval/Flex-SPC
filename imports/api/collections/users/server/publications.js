// All Users-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

Meteor.publish('users.all', function() {
    return Meteor.users.find({});
});