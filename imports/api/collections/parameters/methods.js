// Methods related to Parameters Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { Parameters } from './parameters.js';

Meteor.methods({
    'parameters.insert': function(parameterData) {

        // Validation of data from the client using schema
        Parameters.schema.validate(parameterData);

        if(!this.userId) {
            throw new Meteor.Error(error.reason);
        }

        try {
            Parameters.insert({
                name: parameterData.name,
                createdAt: new Date(),
                deletedAt: new Date(),
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    },
    'parameters.remove': function(parameterId) {
        const deleteParameters = Parameters.findOne(parameterId);

        if(!deleteParameters.editableBy(this.userId)) {
            throw new Meteor.Error(error.reason);
        }

        Parameters.update({ _id: parameterId }, {
            $set: {
                deletedAt: new Date(),
            }
        });
    }
});