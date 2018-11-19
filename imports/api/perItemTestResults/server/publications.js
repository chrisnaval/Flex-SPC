// All Per Item Test Results-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { PerItemTestResults } from '../perItemTestResults.js';

Meteor.publish('perItemTestResults.all', function() {
  return PerItemTestResults.find({});
});