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

module.exports = roles;