// Methods related to Products Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection(s)
import { Products } from './products.js';

Meteor.methods({
  'products.insert': function(productData) {
    // Validation for Products Data from the Client
    new SimpleSchema({
      name: {
        type: String
      },
      quantity: {
        type: Number
      },
      testerRoute: {
        type: [Object]
      },
    }).validate( productData );

    try {
      Products.insert({
        name: productData.name,
        quantity: productData.quantity,
        testerRoute: productData.testerRoute,
        createdAt: new Date(),
        deletedAt: null,
      });
    } catch(error) {
      throw new Meteor.Error('error', error.error);
    }
  },
  'products.update': function(productsId, productData) {
    // Validation for Products Data from the Client
    new SimpleSchema({
      name: {
        type: String
      },
      quantity: {
        type: Number
      },
      testerRoute: {
        type: [Object]
      },
    }).validate( productData );

    const editProduct = Products.findOne(productsId);

    if(!editProduct.editableBy(this.userId)) {
      throw new Meteor.Error(error.reason);
    }

    Products.update({ _id: productsId }, { 
      $set: {
        name: productData.name,
        quantity: productData.quantity,
        testerRoute: productData.testerRoute,
        updatedAt: new Date(),
      }
    }, function(error) {
      if(error) {
          throw new Meteor.Error(500, error.message);
      } else {
          console.log("Update Successful");
      }
    });
  },
  'products.remove': function(productsId) {
    const deleteProduct = Products.findOne(productsId);

    if(!deleteProduct.editableBy(this.userId)) {
      throw new Meteor.Error(error.reason);
    }

    // Soft Delete
    Products.update({ _id: productsId }, {
      $set: {
        deletedAt: new Date(),
      }
    });
  }
});