// All Products-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Mongo Collection(s)
import { Products } from '../products.js';

Meteor.publish('products.all', function() {
    return Products.find({}, {
        sort:{
            createdAt: -1
        },
        limit: 10
    });
});