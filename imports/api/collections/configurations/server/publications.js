// All Configurations-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Mongo Collection(s)
import { Configurations } from '../configurations.js';

Meteor.publish('configurations.all', function() {
    return Configurations.find({});
});