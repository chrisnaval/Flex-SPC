// All Items-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { Items } from '../items.js';

Meteor.publish('items.all', function() {
    return Items.find({}, {
        sort:{
            createdAt: -1
        },
        limit: 10
    });
});