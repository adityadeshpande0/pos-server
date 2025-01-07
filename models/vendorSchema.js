const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  availabilityStatus: { type: Boolean, default: true },
  subscriptions: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
      product: { type: String, required: false },
      quantity: { type: Number, required: false },
      orderDate: { type: Date, default: Date.now },
      status: { type: String, default: "pending" },
    },
  ],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Vendor", vendorSchema);
