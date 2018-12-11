// Methods related to Testers Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection
import { Testers } from './testers.js';

Meteor.methods({
  'testers.insert': function(testerData) {

    // validation for testers collection
    new SimpleSchema({
      name: {
        type: String
      },
      paramId: {
        type: String
      },
    }).validate( testerData );

    // make permissio that only user can insert 
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

    // validation for testers collection
    new SimpleSchema({
      name: {
        type: String
      },
      paramId: {
        type: String
      },
    }).validate( testerData );

    // make permission that only specific user can modify their document
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

    // make permission that only user can remove their collection
    const deleteTester = Items.findOne(testersId);

    if (!deleteTester.editableBy(this.userId)) {
      throw new Meteor.Error(error.reason);
    }
    
    // soft-delete
    Testers.update({ _id: testersId }, {
        $set: {
          deletedAt: new Date(),
        }
      }
    );
  }
});