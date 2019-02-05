// Methods related to Per Sample Test Results Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { PerSampleTestResults } from './perSampleTestResults.js';


Meteor.methods({
    'perSampleTestResults.insert': function(perItemTestResultData) {

        try {
            PerSampleTestResults.insert({
                sampleSize: perItemTestResultData.sampleSize,
                sampleItems: perItemTestResultData.sampleItems,
                xBarResult: perItemTestResultData.xBarResult,
                rChartResult: perItemTestResultData.range,
                minimum: perItemTestResultData.minimum,
                maximum: perItemTestResultData.maximum,
                median: perItemTestResultData.median,
                firstQuartile: perItemTestResultData.firstQuartile,
                thirdQuartile: perItemTestResultData.thirdQuartile,
                createdAt: new Date(),
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    },
    'perSampleTestResults.update': function(perSampleTestResultsId, perSampleTestResultData) {

        // Validation of Data from the Client using the Collection's Schema
        PerSampleTestResults.schema.validate(perSampleTestResultData);

        const eidtPerSampleTestResults = PerSampleTestResults.findOne(perSampleTestResultsId);

        if(!eidtPerSampleTestResults.editableBy(this.userId)) {
            throw new Meteor.Error(error.reason);
        }

        PerSampleTestResults.update({_id: perSampleTestResultsId}, {
            $set: { 
                sampleItems: perSampleTestResultData.sampleItems,
                paramId: perSampleTestResultData.paramId,
                paramConfigXBar: perSampleTestResultData.paramConfigXBar, 
                paramConfigRChart: perSampleTestResultData.paramConfigRChart, 
                paramConfig: perSampleTestResultData.paramConfig, 
                xBarResult: perSampleTestResultData.xBarResult, 
                rChartResult: perSampleTestResultData.rChartResult, 
                min: perSampleTestResultData.min, 
                firstQuartile: perSampleTestResultData.firstQuartile, 
                median: perSampleTestResultData.median, 
                thirdQuartile: perSampleTestResultData.thirdQuartile, 
                max: perSampleTestResultData.max, 
                histogramPerSample: perSampleTestResultData.histogramPerSample, 
                updatedAt: new Date(),
            }
        }, function(error) {
            if(error) {
                throw new Meteor.Error(500, error.message);
            }
        });
    },
    'perSampleTestResults.remove': function(perSampleTestResultsId) {
        const deletePerSampleTestResults = PerSampleTestResults.findOne(perSampleTestResultsId);

        if(!deletePerSampleTestResults.editableBy(this.userId)) {
            throw new Meteor.Error(error.reason);
        }

        // Soft Delete
        PerSampleTestResults.update({ _id: perSampleTestResultsId }, {
            $set: {
                deletedAt: new Date(),
            }
        });
    }
});