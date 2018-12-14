// Fill the Db with sample data on startup

// Collection(s)
import { AppModules } from '/imports/api/collections/appModules/appModules.js';
import { UserProfiles } from '/imports/api/collections/users/userProfiles.js';

Meteor.startup(function () {
  // Create Administrator on Users Collection
  if(Meteor.users.find().count() === 0) {
    var userProfileId = UserProfiles.insert({
                        firstName: "Admin",
                        lastName: "Administrator",
                        address: "Cebu City",
                        type: "admin",
                        role: {}
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
        module: "Dashboard"
      },
      {
        module: "Reports"
      },
      {
        module: "Issue Tracker"
      },
    ];

    modules.forEach(element => {
      AppModules.insert(element);
    });
  }
});
