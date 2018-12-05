// All Parameters-related Publications

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

// Import(s)
import { Parameters } from '../parameters.js';


Meteor.publish('parameters.all', function(name) {
  new SimpleSchema({
    name: {
      type: String 
    },
  }).validate({ name });

  if (!this.userId) {
    return this.ready();
  }
  return Parameters.findOne({
    userId: this.userId
  }, {
    fields: {name: 1}
  });
});