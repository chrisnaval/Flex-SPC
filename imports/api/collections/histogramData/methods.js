// Methods related to HistogramData Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { HistogramData } from './histogramData.js';

Meteor.methods({
    'histogramData.insert': function(histogramDatas) {

        try {
            histogramDatas.forEach(function(histogramDataArrays) {
                histogramDataArrays.forEach(function(histogramData) {
                    HistogramData.insert({
                        bin: histogramData.bin,
                        binRange: histogramData.binRange,
                        binCount: histogramData.binCount,
                        sampleItem: histogramData.sampleItem,
                        createdAt: new Date()
                    });
                });
            });
            
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    }
});