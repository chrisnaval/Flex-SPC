// Methods related to Users and UserProfiles Collection

// Meteor Package(s)
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// Mongo Collection(s)
import { UserProfiles } from './userProfiles.js';

Meteor.methods({
    'users.insert': function(userData) {
        check(userData, {
            username: String,
            emailAddress: String,
            password: String,
            userProfile: Object
        });

        // Validation of Data from the Client using the Collection's Schema
        UserProfiles.schema.validate(userData.userProfile);

        try {
            UserProfiles.insert({
                firstName: userData.userProfile.firstName,
                lastName: userData.userProfile.lastName,
                contactNo: userData.userProfile.contactNo,
                address: userData.userProfile.address,
<<<<<<< HEAD
                type: userData.userProfile.type,
=======
                contactNo: userData.userProfile.contactNo,
>>>>>>> a8a0628705ffe84924858190c0ae815479e315ed
                role: userData.userProfile.role,
                createdAt: new Date(),
            }, function(error, userProfileId) {
                if(error) {
                    throw new Meteor.Error('error', error.error);
                } else {
                    Accounts.createUser({
                        email: userData.emailAddress,
                        password: userData.password,
                        username: userData.username,
                        profile: UserProfiles.findOne(userProfileId),
                    });
                }
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    },
    'users.update': function(userData, userProfileId) {
        // check(userData, {
        //     firstName: String,
        //     lastName: String,
        //     contactNo: String,
        //     address: String,
        //     role: Object
        // });

        try{
            return UserProfiles.update({ _id: userProfileId }, {
                $set: {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    contactNo: userData.contactNo,
                    address: userData.address,
                    role: userData.role,
                    updatedAt: new Date(),
                }
            }, function(error, reponse) {
                var getProfile = UserProfiles.findOne(reponse);
                console.log(reponse, getProfile);
            });
            // if(success) {
            //     var getProfile = UserProfiles.find(success);
            //     console.log(success, getProfile);
            //     return null, success;
            // } else {
            //     throw new Meteor.Error("Something went wrong")
            // }
            // var getProfile = Meteor.users.update({ _id: userProfileId }, {
            //     $set: {
            //        "profile.firstName": "userData.firstName",
            //         "profile.lastName": "userData.lastName",
            //         "profile.contactNo": "userData.contactNo",
            //         "profile.address": "userData.address",
            //         "profile.role": "userData.role",
            //         updatedAt: new Date(),
            //     }
            // }, function(error, userProfileId) {
            //     if(error) {
            //         throw new Meteor.Error('error', error.error);
            //     } else {
            //         var getProfile = UserProfiles.findOne(userProfileId);
            //         console.log(userProfileId, getProfile);
            //     }
            // });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    }
});