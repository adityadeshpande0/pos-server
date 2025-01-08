const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["superAdmin", "hotelAdmin", "manager", "waiter", "cashier"],
  },
  profilePicture: {
    type: String,
    default: "https://www.gravatar.com/avatar/",
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
    },
  ],
  loyaltyPoints: { type: Number, default: 0 },
  birthday: { type: Date },
  discount: { type: Number },
  authentication: {
    password: { type: String, required: true },
    salt: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiration: { type: Date },
    lastLogin: { type: Date },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
