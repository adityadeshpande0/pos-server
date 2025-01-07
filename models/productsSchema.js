const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }, 
  price: { type: Number, required: true }, 
  subscriptionOptions: [
    {
      duration: { type: String, required: true }, 
      price: { type: Number, required: true },
    },
  ],
  availabilityStatus: { type: Boolean, default: true }, 
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Product", productSchema);
