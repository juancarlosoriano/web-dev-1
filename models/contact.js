let mongoose = require("mongoose");

// Create a model class
let contactModel = mongoose.Schema(
  {
    name: String,
    email: String,
    number: String,
  },
  {
    collection: "Contact",
  }
);

module.exports = mongoose.model("Contact", contactModel);
