// Methods related to Configurations Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { Configurations } from './configurations.js';

Meteor.methods({
    'configurations.create': function(configData) {
        Configurations.insert({
            //
        });
    }
});