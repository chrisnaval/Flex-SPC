// Definition of the ParameterConfig Collection

import { Mongo } from 'meteor/mongo';

export const ParameterConfig = new Mongo.Collection('parameterConfig');

// Schema
ParameterConfig.schema = new SimpleSchema({
	sampleSize: {
		type: Number,
	},
	xBarCtrlLimit: {
		type: Object,
		blackbox: true,
	},
	'xBarCtrlLimit.xBarUpperCtrlLimit': {
		type: Number,
	},
	'xBarCtrlLimit.xBarLowerCtrlLimit': {
		type: Number,
	},
	xBarSpecLimit: {
		type: Object,
		blackbox: true
	},
	'xBarSpecLimit.xBarUpperSpecLimit': {
		type: Number,
	},
	'xBarSpecLimit.xBarLowerSpecLimit': {
		type: Number,
	},
	rChartCtrlLimit: {
		type: Object,
		blackbox: true
	},
	'rChartCtrlLimit.rUpperCtrlLimit': {
		type: Number,
	},
	'rChartCtrlLimit.rLowerCtrlLimit': {
		type: Number,
	},
	rChartSpecLimit: {
		type: Object,
		blackbox: true
	},
	'rChartSpecLimit.rUpperSpecLimit': {
		type: Number,
	},
	'rChartSpecLimit.rLowerSpecLimit': {
		type: Number,
	},
	parameters: {
		type: Object,
	},
	createdAt: {
		type: Date,
		optional: true,
	},
	deletedAt: {
		type: Date,
		optional: true,
	},
});