const mongoose = require("mongoose");

var timestamps = require("mongoose-timestamp");

const ProfileSchema = new mongoose.Schema({
  EMAIL: {
    type: String,

    required: true,

    unique: true,

    lowercase: true
  },

  ACCOUNTSTATUS: {
    type: String,

    required: false,

    default: "none"
  },

  NOOFBUSINESS: {
    type: Number,
    required: false,
    default: 0
  },

  DOCUMENTID: {
    type: String,
    required: false
  },

  DOCUMENTTYPE: {
    type: String,
    required: false
  },

  DOCUMENTREPORT: {
    type: String,
    required: false
  },

  TWITTERID: {
    type: String,
    required: false
  },
  INSTAGRAMID: {
    type: String,
    required: false
  },
  QUERYPERIOD: {
    type: Date,

    default: Date.now
  }
});

ProfileSchema.plugin(timestamps, {
  createdAt: "created_at",

  updatedAt: "updated_at"
});

module.exports = mongoose.model("PROFILEDATA", ProfileSchema);
