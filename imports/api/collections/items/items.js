// Definition of the Items Collection

import { Mongo } from 'meteor/mongo';

export const Items = new Mongo.Collection('items');

// Schema
Items.schema = new SimpleSchema({
  name: {
    type: String,
    optional: false,
  },
  category: {
    type: String,
    optional: true,
  },
  productId: {
    type: String,
    optional: false,
  },
  productName: {
    type: String,
    optional: false,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date()
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      return new Date()
    }
  },
  deletedAt: {
    type: Date,
    autoValue: function() {
      return null
    }
  },
});
