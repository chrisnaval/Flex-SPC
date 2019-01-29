// Definition of the PerItemTestResults Collection

import { Mongo } from 'meteor/mongo';

export const PerItemTestResults = new Mongo.Collection('perItemTestResults');

// Schema
PerItemTestResults.schema = new SimpleSchema({
	assembly: {
		type: String
	},
	product: {
		type: Object
	},
	itemCode: {
		type: String
	},
	testResults: {
		type: Array
	},
	'testResults.$': {
		type: Object
	},
	'testResults.$.tester': {
		type: Object
	},
	'testResults.$.tester._id': {
		type: String
	},
	'testResults.$.tester.name': {
		type: String
	},
	'testResults.$.parameters': {
		type: Array
	},
	'testResults.$.parameters.$': {
		type: Object
	},
	'testResults.$.parameters.$._id': {
		type: String
	},
	'testResults.$.parameters.$.paramName': {
		type: String
	},
	measurement: {
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