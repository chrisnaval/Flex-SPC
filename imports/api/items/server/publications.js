// All Items-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { Items } from '../items.js';

Meteor.publish('items.all', function() {
  return Items.find({});
});