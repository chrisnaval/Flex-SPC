// Definition of the RolePermissions Collection

import { Mongo } from 'meteor/mongo';

export const RolePermissions = new Mongo.Collection('rolePermissions');

// Schema
RolePermissions.schema = new SimpleSchema({
	role: {
		type: Object,
		optional: false
	},
	'role._id': {
		type: String
	},
	'role.role': {
		type: String
	},
	'role.description': {
		type: String
	},
	'role.roleType': {
		type: String
	},
	permissions: {
		type: Array,
		optional: false
	},
	'permissions.$': {
		type: Object,
		optional: false
	},
	'permissions.$._id': {
		type: String
	},
	'permissions.$.module': {
		type: String
	},
	'permissions.$.functionName': {
		type: String
	},
	'permissions.$.permission': {
		type: String
	},
});