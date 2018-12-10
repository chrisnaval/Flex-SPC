// Import(s)
import './insert.html';

import { Template } from 'meteor/templating';

import { AppModule } from '/imports/api/admin/appModule/appModule.js';

//Fetch data from those subsciption
Template.role_insert.onCreated(function() {
  Tracker.autorun(function() {
    Meteor.subscribe('appModule.all');
  });
  console.log('success');
});

Template.role_insert.helpers({
    appModule(){  
      return AppModule.find({});
  }
});

// Template Events
Template.role_insert.events({
  'submit .permission.insert'(event) {
    event.preventDefault();

    const target = event.target;

    var tester = {
      testerId: 1,
      testerName: 'sdesdfdsf'
    };

    var testArray = [];

    testArray.push(tester);

    var roleData = {
      name: target.name.value,
      permissions: testArray
    };

    console.log(roleData, testArray);

    Meteor.call('role.insert', roleData, function(error) {
      if(error) {
        document.getElementById('error-msg').innerHTML = error.reason;
      } else {
        //
      }
    });

    var permissionData = {
      roleId: roleData,
      permission: target.permission.value,
    };
    console.log(typeof permissionData.permission);

    Meteor.call('permission.insert', permissionData, function(error) {
      if(error) {
        document.getElementById('error-msg').innerHTML = error.reason;
      } else {
        //
      }
    });
    // FlowRouter.go('/');
  },
});