const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  postcode: { type: String, required: false },
  town: { type: String, required: false },
  phone: { type: String, required: false },
  date: { type: Date, default: Date.now },
  savedAds: [],
});

module.exports = mongoose.model("user", UserSchema);
