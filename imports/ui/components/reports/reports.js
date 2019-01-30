import './reports.html';

// Mongo Collection(s)
import { Configurations } from '/imports/api/collections/configurations/configurations.js';

Template.Reports.onRendered(function() {
	Meteor.subscribe('dateRange');
});

Template.Reports.helpers({
    dateRange() {
		return Configurations.find({});
	},
});