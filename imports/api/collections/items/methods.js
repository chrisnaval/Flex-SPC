// Methods related to Items Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection(s)
import { Items } from './items.js';

Meteor.methods({
  'items.insert': function(itemData) {

    // validation for item collection
    new SimpleSchema({
      name: {
        type: String
      },
      category: {
        type: String
      },
      productId: {
        type: String
      },
      productName: {
        type: String
      },
    }).validate( itemData );

    // make permission that only user can insert documents
    if (!this.userId) {
      throw new Meteor.Error(error.reason);
    }

    try {
      Items.insert({
        name: itemData.name,
        category: itemData.category,
        productId: itemData.productId, 
        productName: itemData.productName, 
        createdAt: new Date(),
        deletedAt: null,
      });
    } catch(error) {
      throw new Meteor.Error('error', error.error);
    }
  },
  'items.update': function(itemId, itemData) {

    // validation for item Collection
    new SimpleSchema({
      name: {
        type: String
      },
      category: {
        type: String
      },
      productId: {
        type: String
      },
      productName: {
        type: String
      },
    }).validate( itemData );

    // make permission that only specific user can modify their document
    const editItem = Items.findOne(ItemId);

    if (!editItem.editableBy(this.userId)) {
      throw new Meteor.Error(error.reason);
    }

    Items.update({_id: itemId}, { 
      $set: {
        name: itemData.name, 
        category: itemData.category, 
        productId: itemData.productId, 
        productName: itemData.productName,
        updatedAt: new Date(),
      }
    }, function(error) {
      if (error) {
          throw new Meteor.Error(500, error.message);
      } else {
          console.log("Update Successful");
      }
    });
  },
  'items.remove': function(itemId) {

    // make permission that only specific user can remove their document
    const deleteItem = Items.findOne(ItemId);

    if (!deleteItem.editableBy(this.userId)) {
      throw new Meteor.Error(error.reason);
    }

    // soft-delete
    Items.update({ _id: itemId }, {
        $set: {
          deletedAt: new Date(),
        }
      }
    );
  }
});
