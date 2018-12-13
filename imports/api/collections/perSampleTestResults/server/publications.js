// All PerSampleTestResults-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { PerSampleTestResults } from '../perSampleTestResults.js';

Meteor.publish('perSampleTestResults.all', function() {
    return PerSampleTestResults.find({});
});