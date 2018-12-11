// Methods related to Users and User Profile Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

//Collections related for user profile
import { UserProfile } from './userProfile.js';

Meteor.methods({
  'users.insert': function(userData, profile) {
    //User Data
    check(userData, {
      email: String,
      password: String,
      profile: Object
    });

    // validation for userProfile Collection
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
      userRole: {
        type: String
      },
    }).validate( profile );

    const userExists = Accounts.findUserByEmail(userData.email);

    // hook profile field passed from client
    if(!userExists) {
      Accounts.onCreateUser(function(options, user) {
        user.profile = options.profile || {};
        
        user.profile.userType = options.userType;
        user.profile.firstName = options.firstName;
        user.profile.lastName = options.lastName;
        user.profile.address = options.address;
        user.profile.userRole = options.userRole;
        return user;
      });
    }

    //User Profile
    var profile = {
      userType: profile.userType,  
      firstName: profile.firstName,  
      lastName: profile.lastName,  
      address: profile.address,  
      userRole: profile.userRole,
      createdAt: new Date(),
      deletedAt: null,
    }
    if(Meteor.userId()) {
      try {
        UserProfile.insert(profile);
      } catch(error) {
        throw new Meteor.Error('error', error.error);
      }
    }
  },
});