// All Parameters-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { Parameters } from '../parameters.js';

Meteor.publish('parameters.all', function() {
    return Parameters.find({});
});