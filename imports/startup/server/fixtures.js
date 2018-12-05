// Fill the Db with sample data on startup
// export const Parameters = new Mongo.Collection('parameters');

import { Parameters } from '/imports/api/parameters/parameters.js';

Meteor.startup(() => {
  if (Parameters.find().count() === 0) {
    Parameters.insert({
      _id: '23kl4j2k2j4lk2k',
      name: 'electric',
    });
  }
});

Meteor.startup(function() {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: 'jhosua',
      email: 'admin@gmail.com',
      password: 'secret'
    });
  }
});
