// Definition of the Per Sample Test Results Collection

import { Mongo } from 'meteor/mongo';

export const PerSampleTestResults = new Mongo.Collection('perSampleTestResults');

// Schema
PerSampleTestResults.schema = new SimpleSchema({
	sampleItems: {
		type: Array
	},
	'sampleItems.$': {
		type: Object
	},
	xBarResult: {
		type: Number
	},
	rChartResult: {
		type: Number
	},
	minimum: {
		type: Number
	},
	firstQuartile: {
		type: Number
	},
	median: {
		type: Number
	},
	thirdQuartile: {
		type: Number
	},
	maximum: {
		type: Number
	},
	createdAt: {
		type: Date,
		optional: true
	},
	updatedAt: {
		type: Date,
		optional: true
	},
	deletedAt: {
		type: Date,
		optional: true
	}
});