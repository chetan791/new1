const mongoose = require("mongoose");

const userlogoutSchema = mongoose.Schema(
  {
    token: String,
  },
  {
    versionKey: false,
  }
);

const userlogoutModel = mongoose.model("instamasai-logout", userlogoutSchema);

module.exports = { userlogoutModel };
