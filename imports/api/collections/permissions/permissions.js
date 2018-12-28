// Definition of the Permissions Collection

import { Mongo } from 'meteor/mongo';

export const Permissions = new Mongo.Collection('permissions');

// Schema
Permissions.schema = new SimpleSchema({
    moduleName: {
        type: String,
        optional: false
    },
    functionName: {
        type: String,
        optional: false
    },
    permission: {
        type: String,
        optional: false
    }
});