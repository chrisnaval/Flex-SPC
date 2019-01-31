import './reports.html';

// Meteor Package(s)
import { Session } from 'meteor/session';

// Mongo Collection(s)
import { Configurations } from '/imports/api/collections/configurations/configurations.js';
import { PerItemTestResults } from '/imports/api/collections/perItemTestResults/perItemTestResults.js';

Template.Reports.onRendered(function() {
	Meteor.subscribe('dateRange');
	Meteor.subscribe('perItemTestResults.all', {limit:(Session.get('limit'))});
	Meteor.subscribe('configurations.all');
	Meteor.subscribe('overtime', {limit:(Session.get('limit'))});
});

Template.Reports.helpers({
    dateRange() {
		return Configurations.find({});
	},
	rangeSample() {
		var configId = '5Qbd8wJZNsdsqB7i8';
		var config = Configurations.findOne({ _id: configId });
		var configSampleSize = config.sampleSize;
		return PerItemTestResults.find({}, {limit: configSampleSize});
		// console.log(max);
	}
});