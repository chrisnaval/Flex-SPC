// All Parameter Config related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { ParameterConfig } from '../parameterConfig.js';

// Publish(s)
Meteor.publish('parameterConfig.all', function() {
  return ParameterConfig.find({});
});