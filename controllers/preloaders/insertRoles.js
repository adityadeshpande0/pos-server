const mongoose = require("mongoose");
const RoleAccess = require("../../models/acessModel");

// Define Roles Data
const roles = [
  {
    roleName: "BUSINESS_ADMIN",
    permissions: {
      food_management: {
        access: true,
        add_menu: true,
        add_addons: true,
        add_recipe: true,
        food_list: true,
        addon_list: true,
        recipe_list: true,
      },
      order_management: {
        access: true,
        order_list: true,
        new_order: true,
        bill_list: true,
      },
      inventory_management: {
        access: true,
        inventory_list: true,
        add_inventory: true,
      },
    },
  },
  {
    roleName: "STORE_ADMIN",
    permissions: {
      food_management: {
        access: true,
        add_menu: true,
        add_addons: true,
        add_recipe: true,
        food_list: true,
        addon_list: true,
        recipe_list: true,
      },
      order_management: {
        access: true,
        order_list: true,
        new_order: true,
        bill_list: true,
      },
      inventory_management: {
        access: true,
        inventory_list: true,
        add_inventory: true,
      },
    },
  },
];

const insertRoles = async () => {
  try {
    for (const role of roles) {
      const existingRole = await RoleAccess.findOne({ roleName: role.roleName });
      if (!existingRole) {
        await RoleAccess.create(role);
        console.log(`Role ${role.roleName} added successfully.`);
      } else {
        console.log(`Role ${role.roleName} already exists.`);
      }
    }
    console.log("Role Insertion Completed.");
  } catch (error) {
    console.error("Error inserting roles:", error);
  }
};

module.exports = insertRoles;
