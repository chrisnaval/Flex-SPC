// All Products-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { Products } from '../products.js';

// Publish(s)
Meteor.publish('products.all', function() {

  return Products.find({}, {
    sort:{
      createdAt: -1
    },
    limit: 10
  });
});

