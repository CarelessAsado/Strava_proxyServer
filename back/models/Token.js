const mongoose = require("mongoose");
const Tokens = new mongoose.Schema({
  token_type: String,
  access_token: { type: String, required: [true, "Access token is missing. "] },
  expires_at: Number,
  expires_in: Number,
  refresh_token: {
    type: String,
    required: [true, "Refresh token is missing. "],
  },
});
module.exports = mongoose.model("Tokens", Tokens);
