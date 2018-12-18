// Definition of the UserProfiles Collection

import { Mongo } from 'meteor/mongo';

export const UserProfiles = new Mongo.Collection('userProfiles');

// Schema
UserProfiles.schema = new SimpleSchema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    },
    type: {
        type: String,
        optional: true,
    },
    role: {
        type: Object,
    },
    'role._id': {
        type: String,
    },
    'role.role': {
        type: String,
    },
    createdAt: {
        type: Date,
        optional: true,
    },
    updatedAt: {
        type: Date,
        optional: true,
    },
});