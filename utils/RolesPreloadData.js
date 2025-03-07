const roles = [
  {
    roleName: "BUSINESS_ADMIN",
    permissions: {
      food_management: {
        name: "Food Management",
        access: true,
        submenu: [
          { name: "Add Menu", access: true },
          { name: "Add Addons", access: true },
          { name: "Add Recipe", access: true },
          { name: "Food List", access: true },
          { name: "Addon List", access: true },
          { name: "Recipe List", access: true },
        ],
      },
      order_management: {
        name: "Order Management",
        access: true,
        submenu: [
          { name: "Order List", access: true },
          { name: "New Order", access: true },
          { name: "Bill List", access: true },
        ],
      },
      inventory_management: {
        name: "Inventory Management",
        access: true,
        submenu: [
          { name: "Inventory List", access: true },
          { name: "Add Inventory", access: true },
        ],
      },
    },
  },
  {
    roleName: "STORE_ADMIN",
    permissions: {
      food_management: {
        name: "Food Management",
        access: true,
        submenu: [
          { name: "Add Menu", access: true },
          { name: "Add Addons", access: true },
          { name: "Add Recipe", access: true },
          { name: "Food List", access: true },
          { name: "Addon List", access: true },
          { name: "Recipe List", access: true },
        ],
      },
      order_management: {
        name: "Order Management",
        access: true,
        submenu: [
          { name: "Order List", access: true },
          { name: "New Order", access: true },
          { name: "Bill List", access: true },
        ],
      },
      inventory_management: {
        name: "Inventory Management",
        access: true,
        submenu: [
          { name: "Inventory List", access: true },
          { name: "Add Inventory", access: true },
        ],
      },
    },
  },
  {
    roleName: "STORE_MANAGER",
    permissions: {
      food_management: {
        name: "Food Management",
        access: false,
        submenu: [
          { name: "Add Menu", access: false },
          { name: "Add Addons", access: false },
          { name: "Add Recipe", access: false },
          { name: "Food List", access: false },
          { name: "Addon List", access: false },
          { name: "Recipe List", access: false },
        ],
      },
      order_management: {
        name: "Order Management",
        access: false,
        submenu: [
          { name: "Order List", access: false },
          { name: "New Order", access: false },
          { name: "Bill List", access: false },
        ],
      },
      inventory_management: {
        name: "Inventory Management",
        access: false,
        submenu: [
          { name: "Inventory List", access: false },
          { name: "Add Inventory", access: false },
        ],
      },
    },
  },
];

module.exports = roles;
