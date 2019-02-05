// Methods related to HistogramData Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { HistogramData } from './histogramData.js';

Meteor.methods({
    'histogramData.insert': function(histogramDatas) {

        try {
            HistogramData.insert({
                bin: histogramDatas.bin,
                binRange: histogramDatas.binRange,
                binCount: histogramDatas.binCount,
                sampleItem: histogramDatas.sampleItem,
                createdAt: new Date()
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    }
});