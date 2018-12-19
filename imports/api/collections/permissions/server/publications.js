// All Permissions-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Mongo Collection(s)
import { Permissions } from '../permissions.js';

Meteor.publish('permissions.all', function() {
    return Permissions.find({});
});