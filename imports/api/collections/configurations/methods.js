// Methods related to Configurations Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Mongo Collection(s)
import { Configurations } from './configurations.js';


Meteor.methods({
    'configurations.insert': function(configData) {

        // Validation of Data from the Client using the Collection's Schema
        Configurations.schema.validate(configData);

        return Configurations.insert({
            product: configData.product,
            _id: configData.productId,
            name: configData.name,
            sampleSize: configData.sampleSize,

            tester: configData.tester,
            _id: configData.parameterId,
            name: configData.name,

            parameter: configData.parameter,
            _id: configData.testersId,
            name: configData.name,
    
            controlLimit: configData.controlLimit,
            upperControlLimit: configData.upperControlLimit,
            lowerControlLimit: configData.lowerControlLimit,
    
            specLimit: configData.specLimit,
            upperSpecLimit: configData.upperSpecLimit,
            lowerSpecLimit: configData.lowerSpecLimit,

            createdAt: new Date(),
        });
    },
    'configurations.remove': function(configDataId) {
        try {
            // soft delete for configuration Collection
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