// Publications related to Reports Module

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Mongo Collection(s)
import { PerItemTestResults } from '../../collections/perItemTestResults/perItemTestResults.js';
import { PerSampleTestResults } from '../../collections/perSampleTestResults/perSampleTestResults.js';

Meteor.publish('candlestickData.overtime', function() {
    // return PerItemTestResults.find({});
});

Meteor.publish('histogramData.perSample', function(configData) {
    // var perSampleTestResults = PerSampleTestResults.find({
    //     'product.name': configData.product.name,
    // }, { limit: configData.sampleSize }).fetch();
});