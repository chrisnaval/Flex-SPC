// Methods related to Testers Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Mongo Collection(s)
import { Testers } from './testers.js';

Meteor.methods({
    'testers.insert': function(testerData) {
        // Validation of data from the client using the collection's schema
        Testers.schema.validate(testerData);

        if(!this.userId) {
            throw new Meteor.Error(error.reason);
        }

        try {
            Testers.insert({
                name: testerData.name,
                createdAt: new Date(),
                deletedAt: null,
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    },
    'testers.update': function(testerId, testerData) {
        // Validation of data from the client using the collection's schema
        Testers.schema.validate(testerData);

        const editTester = Testers.findOne(testerId);

        if(!editTester.editableBy(this.userId)) {
            throw new Meteor.Error(error.reason);
        }

        Testers.update({ _id: testerId }, { 
            $set: {
                name: testerData.name, 
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
    'testers.remove': function(testerId) {
        const deleteTester = Items.findOne(testerId);

        if(!deleteTester.editableBy(this.userId)) {
            throw new Meteor.Error(error.reason);
        }

        // Soft Delete
        Testers.update({ _id: testerId }, {
            $set: {
                deletedAt: new Date(),
            }
        });
    }
});