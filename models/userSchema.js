const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    location: {
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false },
    },
  },
  subscriptions: [
    {
      vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: false,
      },
      subscriptionType: { type: String, required: false },
      product: { type: String, required: false },
      startDate: { type: Date, required: false },
      endDate: { type: Date, required: false },
      status: { type: String, default: "active" },
    },
  ],
  orders: [
    {
      vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: false,
      },
      product: { type: String, required: false },
      quantity: { type: Number, required: false },
      orderDate: { type: Date, default: Date.now },
      status: { type: String, default: "pending" },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
