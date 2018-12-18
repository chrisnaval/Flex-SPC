// Fill the Db with sample data on startup

// Mongo Collection(s)
import { AppModules } from '/imports/api/collections/appModules/appModules.js';
import { UserProfiles } from '/imports/api/collections/users/userProfiles.js';

Meteor.startup(function() {
    // Create Super Admin
    if(Meteor.users.find().count() === 0) {
        var userProfileId = UserProfiles.insert({
            firstName: "Admin",
            lastName: "Administrator",
            address: "Cebu City",
            contactNo: "",
            type: "admin",
            role: {
                _id: "",
                role: "Administrator"
            }
        });

        var userProfile = UserProfiles.findOne(userProfileId);

        Accounts.createUser({
            email: "admin@email.com",
            password: "secret-passw0rt",
            username: "admin",
            profile: userProfile
        });
    }

    // Seed Data to AppModules Collection
    if(AppModules.find().count() === 0) {
        const modules = [
            {
                name: "Dashboard",
                module: "dashboard",
                type: "user"
            },
            {
                name: "Reports",
                module: "reports",
                type: "user"
            },
            {
                name: "Issue Tracker",
                module: "issue-tracker",
                type: "user"
            },
        ];

        modules.forEach(element => {
            AppModules.insert(element);
        });
    }
});