// Definition of the AppModules Collection

import { Mongo } from 'meteor/mongo';

export const AppModules = new Mongo.Collection('appModules');

// Schema
AppModules.schema = new SimpleSchema({
  module: {
    type: String,
    optional: false
  },
});