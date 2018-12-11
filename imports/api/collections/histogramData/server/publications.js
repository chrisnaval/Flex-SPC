// All HisogramData-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collections(s)
import { HistogramData } from '../histogramData.js';

Meteor.publish('histogramData.all', function() {
  return HistogramData.find({});
});