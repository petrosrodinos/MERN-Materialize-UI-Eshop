const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, min: 3, max: 20 },
    phone: { type: String, required: true, min: 5, max: 10, unique: true },
    password: { type: String, required: true, max: 30, min: 5 },
    email: { type: String, min: 3, max: 20 },
    address: { type: String, required: true, min: 3, max: 20 },
    emailVerified: { type: Boolean, required: true, default: false },
    phoneVerified: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: Date.now() },
  }
  //   { timestaps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
