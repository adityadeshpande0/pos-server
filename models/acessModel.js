const mongoose = require("mongoose");

const RoleAccessSchema = new mongoose.Schema({
  roleName: {
    type: String,
    enum: [
      "BUSINESS_ADMIN",
      "STORE_ADMIN",
      "STORE_MANAGER",
      "STORE_WAITER",
      "STORE_CHEF",
      "STORE_CASHIER",
      "BUSINESS_TECHNITIAN",
    ],
    required: true,
    unique: true,
  },
  permissions: {
    food_management: {
      access: { type: Boolean, default: false },
      add_menu: { type: Boolean, default: false },
      add_addons: { type: Boolean, default: false },
      add_recipe: { type: Boolean, default: false },
      food_list: { type: Boolean, default: false },
      addon_list: { type: Boolean, default: false },
      recipe_list: { type: Boolean, default: false },
    },
    order_management: {
      access: { type: Boolean, default: false },
      order_list: { type: Boolean, default: false },
      new_order: { type: Boolean, default: false },
      bill_list: { type: Boolean, default: false },
    },
    inventory_management: {
      access: { type: Boolean, default: false },
      inventory_list: { type: Boolean, default: false },
      add_inventory: { type: Boolean, default: false },
    },
  },
});
module.exports = mongoose.model("RoleAccess", RoleAccessSchema);
