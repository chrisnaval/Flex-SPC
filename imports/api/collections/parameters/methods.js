// Methods related to Parameters Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection(s)
import { Parameters } from './parameters.js';

Meteor.methods({
    'parameters.insert': function(parameterData) {
        // Validation for Parameter Collection
        new SimpleSchema({
            name: {
                type: String
            },
        }).validate( parameterData );

        if(!this.userId) {
            throw new Meteor.Error(error.reason);
        }

        try {
            Parameters.insert({
                name: parameterData.name,
                createdAt: new Date(),
                deletedAt: null,
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