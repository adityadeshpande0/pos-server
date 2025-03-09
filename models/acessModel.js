const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  access: { type: Boolean, default: false },
  submenu: [
    {
      name: { type: String, required: true },
      access: { type: Boolean, default: false },
    },
  ],
});

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
      "BUSINESS_TECHNICIAN",
    ],
    required: true,
    unique: true,
  },
  permissions: {
    restaurant_management: PermissionSchema,
    food_management: PermissionSchema,
    order_management: PermissionSchema,
    inventory_management: PermissionSchema,
  },
});

module.exports = mongoose.model("RoleAccess", RoleAccessSchema);
