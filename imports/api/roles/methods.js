// Methods related to Roles Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

import { check } from 'meteor/check'

// Collection
import { Roles } from './roles.js';

Meteor.methods({
  'role.insert': function(roleData) {
    check(roleData, {
      name: String,
      permissions: [Object]
    });

    try {
      Roles.insert({
        name: roleData.name,
        permissions: roleData.permissions,
      });
    } catch(error) {
      throw new Meteor.error('error', error.reason);
    }
  },

});