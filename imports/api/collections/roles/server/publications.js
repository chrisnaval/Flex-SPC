// All Roles-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
import { publishPagination } from 'meteor/kurounin:pagination';

// Mongo Collection(s)
import { Roles } from '../roles.js';

publishPagination(Roles);

Meteor.publish('roles.all', function() {
    return Roles.find({});
});

Meteor.publish('roles.list', function(options) {
    return Roles.find({
        'role': { 
            $ne: "Super Administrator" 
        },
    }, options);
});

Meteor.publish('roles.search', function(keyword, options) {
    return Roles.find({
        $and: [
            {
                'role': { 
                    $ne: "Super Administrator" 
                }
            }, 
            {
                'role': {
                    $regex: ".*" + keyword + ".*",
                    $options: "i"
                }
            }
        ]
    }, options);
});