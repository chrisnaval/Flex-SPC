// All Hisogram Data-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { HistogramData } from '../histogramData.js';

Meteor.publish('histogramData.all', function() {
  return HistogramData.find({});
});