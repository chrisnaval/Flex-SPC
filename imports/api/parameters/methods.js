// Methods related to Parameters Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection
import { Parameters } from './parameters.js';

Meteor.methods({
  'parameters.insert': function(parameterData) {

    // validation for parameter collection
    new SimpleSchema({
      name: {
        type: String
      },
    }).validate( parameterData );

    // make permission that only user can insert documents
    if (!this.userId) {
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
  'Parameters.remove': function(parameterId) {

    // make permission that only specific user can modify their doucments
    const deleteParameters = Parameters.findOne(parameterId);

    if (!deleteParameters.editableBy(this.userId)) {
      throw new Meteor.Error(error.reason);
    }

    Parameters.update({ _id: parameterId }, {
        $set: {
          deletedAt: new Date(),
        }
      }
    );
  }
});