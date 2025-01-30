const mongoose = require("mongoose");

const businessAdminSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  businessEmail: { type: String, required: true, unique: true },
  businessPhoneNumber: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["BUSINESS_ADMIN"],
    default: "BUSINESS_ADMIN",
  },
  profilePicture: {
    type: String,
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  authentication: {
    hashPassword: { type: String, required: true },
    salt: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiration: { type: Date },
    lastLogin: { type: Date },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BusinessAdmin", businessAdminSchema);
