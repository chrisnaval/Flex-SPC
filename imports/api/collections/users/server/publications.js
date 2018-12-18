// All Users-related Publications

import { Meteor } from 'meteor/meteor';

Meteor.publish('users.all', function() {
    return Meteor.users.find({});
});