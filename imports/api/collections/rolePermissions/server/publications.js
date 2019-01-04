// All RolePermissions Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Mongo Collection(s)
import { RolePermissions } from '../rolePermissions.js';

Meteor.publish('rolePermissions.all', function() {
    return RolePermissions.find({});
});