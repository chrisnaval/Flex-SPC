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

Meteor.publish('productsGetByName', function(name) {

  // validation for product collection
  new SimpleSchema({
    name: {
      type: String 
    },
  }).validate( name );
  
  if (!this.userId) {
    return this.ready();
  }

  return Products.find({
    userId: this.userId
  }, {
      _fields: { name: 1 },
      get fields() {
        return this._fields;
      },
      set fields(value) {
        this._fields = value;
      },
  });
});

