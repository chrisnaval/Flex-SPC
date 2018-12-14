// Definition of the Configurations Collection

import { Mongo } from 'meteor/mongo';

export const Configurations = new Mongo.Collection('configurations');

// Schema
Configurations.schema = new SimpleSchema({
	product: {
		type: Object,
	},
	'product._id': {
		type: String,
	},
	'product.name': {
		type: String,
	},
	sampleSize: {
		type: Number,
	},
	tester: {
		type: Object,
	},
	'tester._id': {
		type: String,
	},
	'tester.name': {
		type: String,
	},
	parameter: {
		type: Object,
	},
	'parameter._id': {
		type: String,
	},
	'parameter.name': {
		type: String,
	},
	controlLimit: {
		type: Object,
	},
	'controlLimit.upper': {
		type: Number,
	},
	'controlLimit.lower': {
		type: Number,
	},
	specLimit: {
		type: Object,
	},
	'specLimit.upper': {
		type: Number,
	},
	'specLimit.lower': {
		type: Number,
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