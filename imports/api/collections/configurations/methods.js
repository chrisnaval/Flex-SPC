// Methods related to Configurations Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Mongo Collection(s)
import { Configurations } from './configurations.js';

Meteor.methods({
    'configurations.insert': function(configData) {
        // Validation of Data from the Client using the Collection's Schema
        Configurations.schema.validate(configData);

        Configurations.insert({
            configuredBy: configData.configuredBy,
            product: configData.product,
            sampleSize: configData.sampleSize,
            tester: configData.tester,
            parameter: configData.parameter,
            controlLimit: configData.controlLimit,
            specLimit: configData.specLimit,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        });
    },
    'configurations.remove': function(configDataId) {
        try {
            // Soft Delete for Configuration Collection
            Configurations.update({ _id: configDataId }, {
                $set: {
                    deletedAt: new Date(),
                }
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    }
});