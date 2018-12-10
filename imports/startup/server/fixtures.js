// Fill the Db with sample data on startup

// import(s)
import { Permissions } from '/imports/api/permissions/permissions.js';
import { AppModule } from '/imports/api/appModule/appModule.js';

Meteor.startup(function () {
  //Seed Data for permission Collection
  if (Permissions.find().count() === 0) {
    [
      {permission: "can update user"},
      {permission: "can insert user"},
      {permission: "can delete user"},
      {permission: "can modify dashboard"},
      {permission: "can hide the button in users"},
    ].forEach(function(createPermissionData){
      Permissions.insert(createPermissionData);
    });  
  }
  //Seed Data for user Collection
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      email: 'admin@gmail.com',
      password: 'secret',
    });
  }
  //Seed Data for appModule Collection
  if (AppModule.find().count() === 0) {
    [
      {moduleName: "DashBoard"},
      {moduleName: "User DashBoard"},
      {moduleName: "Data Entry"},
      {moduleName: "Issues"},
      {moduleName: "Reports"},
    ].forEach(function(createModuleData){
      AppModule.insert(createModuleData);
    });
  }
});
