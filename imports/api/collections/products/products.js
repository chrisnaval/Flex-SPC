// Definition of the Products Collection

import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

Products.schema = new SimpleSchema({
  name: {
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