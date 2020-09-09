const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  pictures: [Object],
  token: String,
  salt: String,
});

module.exports = User;
