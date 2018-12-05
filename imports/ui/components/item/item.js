import { Template } from 'meteor/templating';

import './item.html';

Template.Item.onCreated(function() {
//
});

Template.Item.helpers({
//
});
Template.Item.events({
  "submit .insert-data": function(event) {
    event.preventDefault();

    const target = event.target;
    var parameterData = {
      name: target.name.value,
    }
    var parameterConfigData = {
      sampleSize: parseInt(target.sampleSize.value),
      xBarCtrlLimit: {
        xBarUpperCtrlLimit: parseInt(target.xBarUpperCtrlLimit.value),
        xBarLowerCtrlLimit: parseInt(target.xBarLowerCtrlLimit.value),
      },
      xBarSpecLimit: {
        xBarUpperSpecLimit: parseInt(target.xBarUpperSpecLimit.value),
        xBarLowerSpecLimit: parseInt(target.xBarLowerSpecLimit.value),
      },
      rChartCtrlLimit: {
        rUpperCtrlLimit: parseInt(target.rUpperCtrlLimit.value),
        rLowerCtrlLimit: parseInt(target.rLowerCtrlLimit.value),
      },
      rChartSpecLimit: {
        rUpperSpecLimit: parseInt(target.rUpperSpecLimit.value),
        rLowerSpecLimit: parseInt(target.rLowerSpecLimit.value),
      }
    }

    Meteor.call('usersDataEntry.insert', parameterConfigData, parameterData, function(error) {
      if(error) {
        document.getElementById("error-msg").innerHTML = error.reason;
      } else {
        
      }
    });
  },
});