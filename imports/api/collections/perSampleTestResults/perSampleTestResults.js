// Definition of the Per Sample Test Results Collection

import { Mongo } from 'meteor/mongo';

export const PerSampleTestResults = new Mongo.Collection('perSampleTestResults');

// Schema
PerSampleTestResults.schema = new SimpleSchema({
	sampleItems: {
		type: [String],
	},
	paramId: {
		type: String,
	},
	paramConfigXBar: {
		type: Number,
	},
	paramConfigRChart: {
		type: Number,
	},
	paramConfig: {
		type: Number,
	},
	xBarResult: {
		type: Number,

	},
	rChartResult: {
		type: Number,
	},
	min: {
		type: Number,
	},
	firstQuartile: {
		type: Number,
	},
	median: {
		type: Number,
	},
	thirdQuartile: {
		type: Number,
	},
	max: {
		type: Number,
	},
	histogramPerSample: {
		type: Number,
		optional: true
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
	},
});