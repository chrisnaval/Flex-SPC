// Fill the Db with sample data on startup

// Collection(s)
import { AppModules } from '/imports/api/collections/appModules/appModules.js';

Meteor.startup(function () {
  // Seed Data to Users Collection (Administrator)
  if(Meteor.users.find().count() === 0) {
    Accounts.createUser({
      email: "admin@gmail.com",
      password: "secret",
      username: "admin",
      profile: {
        userType: "admin",
      }
    });
  }
  
  // Seed Data for appModule Collection
  if(AppModules.find().count() === 0) {
    [
      {
        moduleName: "Dashboard"
      },
      {
        moduleName: "Reports"
      },
      {
        moduleName: "Issue Tracker"
      },
    ].forEach(function(createModuleData){
      AppModules.insert(createModuleData);
    });
  }
});
