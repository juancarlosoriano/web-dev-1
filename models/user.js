let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

// Create a model class
let User = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: "Username is required",
    },
    email: {
      type: String,
      default: "",
      trim: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "User",
  }
);

// Configure options for User Model
let options = { missingPasswordError: "Wrong/Missing Password" };

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("User", User);
