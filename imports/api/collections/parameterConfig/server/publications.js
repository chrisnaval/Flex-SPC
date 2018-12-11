// All ParameterConfig-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Collection(s)
import { ParameterConfig } from '../parameterConfig.js';

Meteor.publish('parameterConfig.all', function() {
    return ParameterConfig.find({});
});