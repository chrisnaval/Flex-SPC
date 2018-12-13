// Methods related to Per Sample Test Results Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection(s)
import { PerSampleTestResults } from './perSampleTestResults.js';

Meteor.methods({
    'perSampleTestResults.insert': function(perSampleTestResultData) {
        // Validation for PerSampleTestResults Data from the Client
        new SimpleSchema({
            sampleItems: {
                type: [String]
            },
            paramId: {
                type: String
            },
            paramConfigXBar: {
                type: Number
            },
            paramConfigRChart: {
                type: Number
            },
            paramConfig: {
                type: Number
            },
            xBarResult: {
                type: Number
            },
            rChartResult: {
                type: Number
            },
            min: {
                type: Number
            },
            firstQuartile: {
                type: Number
            },
            median: {
                type: Number
            },
            thirdQuartile: {
                type: Number
            },
            max: {
                type: Number
            },
            histogramPerSample: {
                type: Number
            }
        }).validate( perSampleTestResultData );

        if(!this.userId) {
            throw new Meteor.Error(error.reason);
        }

        try {
            PerSampleTestResults.insert({
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
                createdAt: new Date(),
                deletedAt: null,
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    },
    'perSampleTestResults.update': function(perSampleTestResultsId, perSampleTestResultData) {
        // Validation for PerSampleTestResults Data from the Client
        new SimpleSchema({
            sampleItems: {
                type: [String]
            },
            paramId: {
                type: String
            },
            paramConfigXBar: {
                type: Number
            },
            paramConfigRChart: {
                type: Number
            },
            paramConfig: {
                type: Number
            },
            xBarResult: {
                type: Number
            },
            rChartResult: {
                type: Number
            },
            min: {
                type: Number
            },
            firstQuartile: {
                type: Number
            },
            median: {
                type: Number
            },
            thirdQuartile: {
                type: Number
            },
            max: {
                type: Number
            },
            histogramPerSample: {
                type: Number
            }
        }).validate( perSampleTestResultData );

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
            } else {
                console.log("Update Successful");
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