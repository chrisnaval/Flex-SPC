// All Per Sample Test Results-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { PerSampleTestResults } from '../perSampleTestResults.js';

Meteor.publish('perSampleTestResults.all', function() {
  return PerSampleTestResults.find({});
});