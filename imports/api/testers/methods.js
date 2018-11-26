// Methods related to Testers Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection
import { Testers } from './testers.js';

Meteor.methods({
  'testers.insert': function(testerData) {
    new SimpleSchema({
      name: {type: String},
      paramId: {type: String},
    }).validate( testerData );

    if (!this.userId) {
      throw new Meteor.Error(error.reason);
    }

    try {
      Testers.insert({
        name: testerData.name,
        paramId: testerData.paramId,  
        createdAt: new Date(),
        deletedAt: null,
      });
    } catch(error) {
      throw new Meteor.Error('error', error.error);
    }
  },
  'testers.update': function(testersId, testerData) {
    new SimpleSchema({
      name: {type: String},
      paramId: {type: String},
    }).validate( testerData );

    const editTester = Testers.findOne(testersId);

    if (!editTester.editableBy(this.userId)) {
      throw new Meteor.Error(error.reason);
    }

    Testers.update({_id: testersId}, { 
      $set: {
        name: testerData.name, 
        paramId: testerData.paramId, 
        updatedAt: new Date(),
      }
    }, function(error) {
      if (error) {
          throw new Meteor.Error(500, error.message);
      } else {
          console.log("Update Successful");
      }
    });
  },
  'testers.remove': function(testersId) {

    const deleteTester = Items.findOne(testersId);

    if (!deleteTester.editableBy(this.userId)) {
      throw new Meteor.Error(error.reason);
    }
    
    Testers.update({ _id: testersId }, {
        $set: {
          deletedAt: new Date(),
        }
      }
    );
  }
});