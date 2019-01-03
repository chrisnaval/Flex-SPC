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
                type: userData.userProfile.type,
                role: userData.userProfile.role,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            }, function(error, userProfileId) {
                if(error) {
                    throw new Meteor.Error('error', error.error);
                } else {
                    Accounts.createUser({
                        email: userData.emailAddress,
                        password: userData.password,
                        username: userData.username,
                        profile: UserProfiles.findOne(userProfileId),
                        updatedAt: new Date(),
                        deletedAt: null,
                    });
                }
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    },
    'users.update': function(userId, userData) {
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

            return UserProfiles.update({ _id:  userProfileId }, {
                $set: {
                    firstName: userData.userProfile.firstName,
                    lastName: userData.userProfile.lastName,
                    address: userData.userProfile.address,
                    contactNo: userData.userProfile.contactNo,
                    type: userData.userProfile.type,
                    role: userData.userProfile.role,
                    updatedAt: new Date(),
                }
            }, function(error, response) {
                if(error) {
                    throw new Meteor.Error('error', error.error);
                } else {
                    Meteor.users.update({ _id: userId }, {
                        $set: {
                            'emails.0.address': userData.emailAddress,
                            username: userData.username,
                            profile: UserProfiles.findOne(userProfileId),
                        }
                    });
                    
                    Accounts.setPassword(userId, userData.password);
                }
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    },
    'users.remove': function(userId) {
        try {
            //Soft Delete for Configuration Collection
            Meteor.users.update({ _id: userId }, {
                $set: {
                    deletedAt: new Date(),
                }
            });
        } catch(error) {
            throw new Meteor.Error('error', error.error);
        }
    }
});