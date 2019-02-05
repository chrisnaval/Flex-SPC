// Definition of the HistogramData Collection

import { Mongo } from 'meteor/mongo';

export const HistogramData = new Mongo.Collection('histogramData');

// Schema
HistogramData.schema = new SimpleSchema({
	bin: {
		type: Number
	},
	binRange: {
		type: Number
	},
	binCount: {
		type: Number
	},
	sampleItem: {
		type: Object
	},
	createdAt: {
		type: Date,
		optional: true
	}
});