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
            return UserProfiles.insert({
                firstName: userData.userProfile.firstName,
                lastName: userData.userProfile.lastName,
                address: userData.userProfile.address,
                contactNo: userData.userProfile.contactNo,
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
    'users.update': function(userId, userData) {

        // try{
        //     return UserProfiles.update({ _id: userProfileId }, {
        //         firstName: userData.firstName,
        //         lastName: userData.lastName,
        //         updatedAt: new Date(),
        //     }, function(error, response) {
        //         var usersProfile = UserProfiles.findOne(response);
        //         console.log(response, usersProfile);
        //     });
            
        // } catch(error) {
        //     throw new Meteor.Error('error', error.error);
        // }

        check(userData, {
            username: String,
            emailAddress: String,
            password: String,
            userProfile: Object
        });

        // Validation of Data from the Client using the Collection's Schema
        UserProfiles.schema.validate(userData.userProfile);

        try {
            var user = Meteor.users.findOne({_id: userId});
            var userProfileId = user.profile._id;

            return UserProfiles.update({ _id:  userProfileId}, {
                firstName: userData.userProfile.firstName,
                lastName: userData.userProfile.lastName,
                address: userData.userProfile.address,
                // type: userData.type,
                role: userData.userProfile.role,
                updatedAt: new Date(),
            }, function(error, response) {
                if(error) {
                    throw new Meteor.Error('error', error.error);
                } else {
                    Meteor.users.update({_id: userId}, {
                        email: userData.emailAddress,
                        // password: userData.password,
                        username: userData.username,
                        profile: UserProfiles.findOne(userProfileId),
                    });
                }
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    }
});