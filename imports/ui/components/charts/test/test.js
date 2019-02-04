import './test.html';

Template.Test.rendered = function () {
    // create data
    data = [
        ["January", 12000],
        ["February", 15000],
        ["March", 16000],
        ["April", 14000],
        ["May", 10000]
      ];
    
      // create a data set
      dataSet = anychart.data.set(data);
  
      // map the data
      var mapping = dataSet.mapAs({x: 0, value: 1, fill: 2, stroke: 2});
  
      // create a chart
      var chart = anychart.column();
  
      // create a series and set the data
      var series = chart.column(mapping);
  
      // set the chart title
      chart.title("Data Sets: Updating");
  
      // set the container id
      chart.container("test");
  
      // initiate drawing the chart
      chart.draw();
};
Template.Reports_create.events({
    'click #updateButton': function() {
        var newName = document.getElementById("inputName").value;
        var newValue = document.getElementById("inputValue").value;
        var newColor = document.getElementById("inputColor").value;
        var newData = [newName, newValue, newColor];
        dataSet.row(0, newData);
    }
});