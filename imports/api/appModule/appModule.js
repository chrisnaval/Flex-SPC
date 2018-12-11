// Definition of the App Module Collection

import { Mongo } from 'meteor/mongo';

export const AppModule = new Mongo.Collection('appModule');

// Schema
AppModule.schema = new SimpleSchema({
  moduleName: {
    type: String,
    optional: false
  },
});