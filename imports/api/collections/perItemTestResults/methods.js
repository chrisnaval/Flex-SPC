// Methods related to PerItemTestResults Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection(s)
import { PerItemTestResults } from './perItemTestResults.js';

Meteor.methods({
    'perItemTestResults.insert': function(perItemTestResultsData) {
        // Validation for PerItemTestResults Data from the Client
        new SimpleSchema({
            itemId: {
                type: String
            },
            paramId: {
                type: String
            },
            paramConfig: {
                type: Number
            },
            paramConfigXBar: {
                type: Number
            },
            paramConfigRChart: {
                type: Number
            },
            xResult: {
                type: Number
            },
        }).validate( perItemTestResultsData );

        if(!this.userId) {
            throw new Meteor.Error(error.reason);
        }

        try {
            PerItemTestResults.insert({
                itemId: perItemTestResultsData.itemId,
                paramId: perItemTestResultsData.paramId,
                paramConfig: perItemTestResultsData.paramConfig, 
                paramConfigXBar: perItemTestResultsData.paramConfigXBar,
                paramConfigRChart: perItemTestResultsData.paramConfigRChart,  
                createdAt: new Date(),
                deletedAt: null,
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    },
    'perItemTestResults.update': function(perItemTestResultsId, perItemTestResultsData) {
        // Validation for PerItemTestResults Data from the Client
        new SimpleSchema({
            itemId: {
                type: String
            },
            paramId: {
                type: String
            },
            paramConfig: {
                type: Number
            },
            paramConfigXBar: {
                type: Number
            },
            paramConfigRChart: {
                type: Number
            },
            xResult: {
                type: Number
            },
        }).validate( perItemTestResultsData );

        const editPerItemTestResults = PerItemTestResults.findOne(perItemTestResultsId);

        if(!editPerItemTestResults.editableBy(this.userId)) {
            throw new Meteor.Error(error.reason);
        }

        PerItemTestResults.update({_id: perItemTestResultsId}, { 
            $set: {
                itemId: perItemTestResultsData.itemId, 
                paramId: perItemTestResultsData.paramId, 
                paramConfig: perItemTestResultsData.paramConfig, 
                paramConfigXBar: perItemTestResultsData.paramConfigXBar,
                paramConfigRChart: perItemTestResultsData.paramConfigRChart,
                xResult: perItemTestResultsData.xResult,
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
    'perItemTestResults.remove': function(perItemTestResultsId) {
        const deletePerItemTestResults = PerItemTestResults.findOne(perItemTestResultsId);

        if(!deletePerItemTestResults.editableBy(this.userId)) {
            throw new Meteor.Error(error.reason);
        }

        // Soft Delete
        PerItemTestResults.update({ _id: perItemTestResultsId }, {
            $set: {
                deletedAt: new Date(),
            }
        });
    }
});