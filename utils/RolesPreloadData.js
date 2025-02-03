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
  {
    roleName: "STORE_MANAGER",
    permissions: {
      food_management: {
        access: false,
        add_menu: false,
        add_addons: false,
        add_recipe: false,
        food_list: false,
        addon_list: false,
        recipe_list: false,
      },
      order_management: {
        access: false,
        order_list: false,
        new_order: false,
        bill_list: false,
      },
      inventory_management: {
        access: false,
        inventory_list: false,
        add_inventory: false,
      },
    },
  },
];

module.exports = roles;
