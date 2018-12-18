// Methods related to Users and UserProfiles Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// Collection(s)
import { UserProfiles } from './userProfiles.js';

Meteor.methods({
    'users.insert': function(userData) {
        check(userData, {
            username: String,
            emailAddress: String,
            password: String,
            userProfile: Object
        });

        // Validation of data from the client using schema
        UserProfiles.schema.validate(userData.userProfile);

        try {
            return UserProfiles.insert({
                firstName: userData.userProfile.firstName,
                lastName: userData.userProfile.lastName,
                address: userData.userProfile.address,
                type: "user",
                role: {
                    _id: userData.userProfile.role._id,
                    role: userData.userProfile.role.role,
                },
                createdAt: new Date(),
            }, function(error, response) {

                var userProfile = UserProfiles.findOne(response);

                if(error) {
                    throw new Meteor.Error('error', error.error);
                } else {
                    Accounts.createUser({
                        email: userData.emailAddress,
                        password: userData.password,
                        username: userData.username,
                        profile: userProfile,
                    });
                }
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    },
    'users.update': function(userData, userProfileId) {

        // UserProfiles.schema.validate(userData);

        try{
            return UserProfiles.update({ _id: userProfileId }, {
                firstName: userData.firstName,
                lastName: userData.lastName,
                address: userData.address,
                // type: user",
                // role: {
                //     _id: userData.userProfile.role._id,
                //     role: userData.userProfile.role.role,
                // },
                updatedAt: new Date(),
            }, function(error, response) {
                var usersProfile = UserProfiles.findOne(response);
                console.log(response, usersProfile);
            });

            // return Meteor.users.update({ _id: "StX6A35Rmarq5eaK2" }, {
            //     $set: {
            //         "profile.firstName": "userData.firstName",
            //         "profile.lastName": "userData.lastName",
            //         "profile.address": "userData.address",
            //         // type: "user",
            //         // role: {
            //         //     _id: userData.role._id,
            //         //     role: userData.role.role,
            //         // },
            //         updatedAt: new Date(),
            //     }
            // }, function(error, response) {
            //     var userProfile = Meteor.users.findOne(response);
            //     console.log(userProfile, response);
            // });
            
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    }
});