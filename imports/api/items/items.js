// Definition of the Items Collection

import { Mongo } from 'meteor/mongo';

export const Items = new Mongo.Collection('items');

// Schema
Items.schema = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  category: {
    type: String,
    optional: true,
  },
  productId: {
    type: String,
  },
  productName: {
    type: String,
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
  },
});