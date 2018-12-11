// All App Module Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { AppModule } from '../appModule.js';

Meteor.publish('appModule.all', function() {
  return AppModule.find({});
});