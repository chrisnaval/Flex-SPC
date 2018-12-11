// Methods related to Users and User Details Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';

import { check } from 'meteor/check';

import { Accounts } from 'meteor/accounts-base';

//Collections related for users
import { UserDetails } from './userDetails.js';

Meteor.methods({
  'users.insert': function(userData, profile) {
    //User Data
    check(userData, {
      email: String,
      password: String,
      profile: Object
    });
    //User Profile
    check(profile, {
      firstName: String,
      lastName: String,
      gender: String,
      userName: String,
    });

    const userExists = Accounts.findUserByEmail(userData.email);

    // hook profile field passed from client
    if(!userExists) {
      Accounts.onCreateUser(function(options, user) {
        user.profile = {
          firstName: options.profile.firstName,
          lastName: options.profile.lastName,
          gender: options.profile.gender,
          userName: options.profile.userName,
        };
        return user;
      });
    }
    //User Profile
    var profile = {
      firstName: profile.firstName,  
      lastName: profile.lastName,  
      gender: profile.gender,  
      userName: profile.userName, 
      createdAt: new Date(),
      deletedAt: null,
    }
    if(Meteor.userId()) {
      try {
        UserDetails.insert(profile);
      } catch(error) {
        throw new Meteor.Error('error', error.error);
      }
    }
  },
  'userProfile.update': function(_id, profile) {
    new SimpleSchema({
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      gender: {
        type: String,
      },
      userName: {
        type: String
      },
    }).validate( profile );

    // //update the user profile from User Details Colletion
    // const userProfile = UserDetails.update({_id: userDetailId}, {
    //   $set: {
    //     firstName: profile.firstName,
    //     lastName: profile.lastName,
    //     gender: profile.gender,
    //     userName: profile.userName,
    //   }
    // });
    
    // //update the user profile from user collection
    // Meteor.users.update({_id: Meteor.userId()}, {
    //   $set: {
    //     profile: userProfile,
    //   }
    // });

    // }
    
  },
  'userRemove': function (_id) {
    Meteor.users.update({_id: Meteor.userId()}, {
      $set: {
        deletedAt: new Date(),
      }
    });
  }
});