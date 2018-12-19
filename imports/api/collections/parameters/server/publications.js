// All Parameters-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Mongo Collection(s)
import { Parameters } from '../parameters.js';

Meteor.publish('parametersData', function() {
    return Parameters.find({}, {
        fields: {
            _id: 1,
            name: 1
        }
    });
});