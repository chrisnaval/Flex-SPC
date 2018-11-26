import { Template } from 'meteor/templating';

import './sample-graph.html';

import './edit-sample-graph.html';

import { Parameters } from '/imports/api/parameters/parameters.js';

Template.Sample_graph.onCreated(function() {
  Meteor.subscribe('parameters.all');
  console.log('success');
});

Template.Sample_graph.helpers({
  parameters: function() {
    return Parameters.find({
      deletedAt: {
        $eq: null
      }
    });
  },
});

Template.Sample_graph.events({
  "submit .insert-data": function(event) {
    event.preventDefault();

    const target = event.target;
    // var tester = {
    //   testerId: 'asd',
    //   testerName: target.sampleItems.value
    // };

    // var testArray = [];
      
    // testArray.push(tester);
    var parameterData = {
      name: target.name.value,
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

    console.log(parameterData);
    Meteor.call('parameters.insert', parameterData, function(error) {
      if(error) {
        document.getElementById("error-msg").innerHTML = error.reason;
      } else {
        
      }
    });
  },
  'click #delete': function(){
    var perSampleTestResultsId = this._id;
    Meteor.call('perSampleTestResults.remove', perSampleTestResultsId, function(error) {
      if(error) {
        document.getElementById("error-msg").innerHTML = error.reason;
      } else {
        
      }
    });
  }
});
Template.Edit_Sample_Graph.events({
  "submit .update-data": function(event){
    event.preventDefault();

    const target = event.target;
    var perSampleTestResultData = {
      sampleItems: target.sampleItems.value,
      paramId: target.paramId.value,
      paramConfigXBar: parseInt(target.paramConfigXBar.value),
      paramConfigRChart: parseInt(target.paramConfigRChart.value),
      paramConfig: parseInt(target.paramConfig.value),
      xBarResult: parseInt(target.xBarResult.value),
      rChartResult: parseInt(target.rChartResult.value),
      min: parseInt(target.min.value),
      firstQuartile: parseInt(target.firstQuartile.value),
      median: parseInt(target.median.value),
      thirdQuartile: parseInt(target.thirdQuartile.value),
      max: parseInt(target.max.value),
      histogramPerSample: parseInt(target.histogramPerSample.value),
    }
    console.log(perSampleTestResultData);
    // var tester = {
    //   testerId: 1,
    //   testerName: target.testerRoute.value
    // };

    // var testArray = [];
    var perSampleTestResultsId = FlowRouter.getParam("_id");

    // testArray.push(tester);
    Meteor.call('perSampleTestResults.update', perSampleTestResultsId, perSampleTestResultData, function(error) {
      if(error) {
        document.getElementById("error-msg").innerHTML = error.reason;
      } else {
        //
      }
    });
  },
});