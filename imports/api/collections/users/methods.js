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
});