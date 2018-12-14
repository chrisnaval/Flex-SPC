// Methods related to Testers Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { Testers } from './testers.js';

Meteor.methods({
  'testers.insert': function(testerData) {
	
	// Validation of data from the client using schema
	Testers.schema.validate(testerData);

    if(!this.userId) {
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
	
	// Validation of data from the client using schema
	Testers.schema.validate(testerData);

    const editTester = Testers.findOne(testersId);

    if(!editTester.editableBy(this.userId)) {
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

    if(!deleteTester.editableBy(this.userId)) {
      throw new Meteor.Error(error.reason);
    }
    
    // Soft Delete
    Testers.update({ _id: testersId }, {
        $set: {
          deletedAt: new Date(),
        }
      }
    );
  }
});