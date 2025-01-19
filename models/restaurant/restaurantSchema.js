const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  ownerName: { type: String, required: true },
  restaurantEmail: { type: String, required: true, unique: true },
  ownerEmail: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  ownerPhoneNumber: { type: String, required: true, unique: true },
  address: {
    street: { type: String},
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String },
  },
  subscriptionDetails: {
    subscriptionType: {
      type: String,
      enum: ["trial", "free", "basic", "premium"],
    },
    subscriptionStartDate: { type: Date },
    subscriptionEndDate: { type: Date },
  },
  gstNumber: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["superAdmin", "hotelAdmin", "manager", "waiter", "cashier"],
    default: "superAdmin",
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
  dateEstablished: { type: Date },
  ownerDOB: { type: Date },
  discount: { type: Number },
  businessAdminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusinessAdmin",
    required: true,
  },
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

module.exports = mongoose.model("Restaurant", restaurantSchema);
