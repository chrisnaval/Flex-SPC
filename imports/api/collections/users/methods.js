// Methods related to Users and UserProfiles Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// Collection(s)
import { UserProfiles } from './userProfiles.js';

Meteor.methods({
  'users.insert': function(userData) {
    // Validation for Users Data Entry
    check(userData, {
      email: String,
      password: String,
      profile: Object
    });

    // Validation for User's Profile Data Entry
    new SimpleSchema({
      userType: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String
      },
      address: {
        type: String
      },
    }).validate( profile );

    const userExists = Accounts.findUserByEmail(userData.email);

    // Hook profile field passed from the client
    if(!userExists) {
      Accounts.onCreateUser(function(options, user) {
        user.profile = options.profile || {};
        
        user.profile.userType = options.userType;
        user.profile.firstName = options.firstName;
        user.profile.lastName = options.lastName;
        user.profile.address = options.address;

        return user;
      });
    }

    // User's Profile Data
    var profile = {
      userType: profile.userType,  
      firstName: profile.firstName,  
      lastName: profile.lastName,  
      address: profile.address,  
      createdAt: new Date(),
      deletedAt: null,
    }

    if(Meteor.userId()) {
      try {
        UserProfiles.insert(profile);
      } catch(error) {
        throw new Meteor.Error('error', error.error);
      }
    }
  },
});