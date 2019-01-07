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

        var currentUserType = Meteor.user().profile.type;
        var userExists = Accounts.findUserByEmail(userData.emailAddress);

        // Validation of Super admin can only create another admin, and admin can only create user
        if(currentUserType == "admin" && userData.userProfile.type == "admin") {
            throw new Meteor.Error("Create-error", "Super Admin can only create another admin");
        } else {
            // Email can only create once, throw an error if the email is already exist
            if(!userExists) {
                var userRole = Roles.findOne({ role: userData.userProfile.role });
                
                return UserProfiles.insert({
                    firstName: userData.userProfile.firstName,
                    lastName: userData.userProfile.lastName,
                    address: userData.userProfile.address,
                    contactNo: userData.userProfile.contactNo,
                    type: userData.userProfile.type,
                    role: userRole,
                    createdAt: new Date(),
                    updatedAt: new Date()
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

                        var user = Meteor.users.findOne({
                            'profile._id': userProfileId
                        });
    
                        Meteor.users.update({ _id: user._id }, {
                            $set: {
                                updatedAt: new Date(),
                                deletedAt: null
                            }
                        });
                    }
                });
            } else {
                throw new Meteor.Error("Email-error", "Email is already exist !");
            }
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

        var currentUserType = Meteor.user().profile.type;
        
        // Validation of Super admin can only create another admin, and admin can only create user
        if(currentUserType == "admin" && userData.userProfile.type == "admin") {
            throw new Meteor.Error("Create-error", "Super Admin can only edit another admin");
        } else {

            var user = Meteor.users.findOne({_id: userId});
            var userProfileId = user.profile._id;
            var userRole = Roles.findOne({ role: userData.userProfile.role });
        
            return UserProfiles.update({ _id:  userProfileId }, {
                $set: {
                    firstName: userData.userProfile.firstName,
                    lastName: userData.userProfile.lastName,
                    address: userData.userProfile.address,
                    contactNo: userData.userProfile.contactNo,
                    type: userData.userProfile.type,
                    role: userRole,
                    updatedAt: new Date(),
                }
            }, function(error) {
                if(error) {
                    throw new Meteor.Error('error', error.error);
                } else {
                    Meteor.users.update({ _id: userId }, {
                        $set: {
                            'emails.0.address': userData.emailAddress,
                            username: userData.username,
                            profile: UserProfiles.findOne(userProfileId),
                            updatedAt: new Date()
                        }
                    });
                    Accounts.setPassword(userId, userData.password);
                }
            });
        }
    },
    'users.remove': function(userId) {

        var currentUserType = Meteor.user().profile.type;
        var type = Meteor.users.findOne({'profile.type': "admin"});


        if(currentUserType == "admin" && type) {
            throw new Meteor.Error("Create-error", "Super Admin can only delete another admin");
        } else {
        //Soft Delete for Configuration Collection
        Meteor.users.update({ _id: userId }, {
            $set: {
                deletedAt: new Date(),
            }
        });
        }
    }
});