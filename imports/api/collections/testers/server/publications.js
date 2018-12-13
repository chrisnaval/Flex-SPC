// All Testers-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { Testers } from '../testers.js';

Meteor.publish('testers.all', function() {
  return Testers.find({});
});