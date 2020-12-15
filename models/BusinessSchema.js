const mongoose = require("mongoose");

var timestamps = require('mongoose-timestamp');

const BusinessSchema = new mongoose.Schema({

    EMAIL: {

        type: String,

        required: true,

        lowercase: true

    },

    BUSINESSID: {
        type: String,

        required: true,

        unique: true
    },

    BUSINESSNAME: {

        type: String,

        required: true

    },

    BUSINESSADDRESS: {
        type: String,

        required: true
    },

    BUSINESSLOGOLINK: {
        type: String,

        required: true
    },

    BUSINESSTYPE: {
        type: String,

        required: true
    },

    NOOFEMPLOYEES: {
        type: Number,

        required: true,

        default: 0

    },

    BUSINESSWEBSITE: {
        type: String,

        required: false
    },

    BUSINESSCONTACTINFO: {
        type: String,

        required: true
    },

    BUSINESSTWITTERURL: {

        type: String,

        required: false

    },

    BUSINESSINSTAGRAMURL: {

        type: String,

        required: false

    },

    QUERYPERIOD: {

        type: Date,

        default: Date.now

    }

});

BusinessSchema.plugin(timestamps, {

    createdAt: 'created_at',

    updatedAt: 'updated_at'

});

module.exports = mongoose.model("BUSINESSDATA", BusinessSchema);
