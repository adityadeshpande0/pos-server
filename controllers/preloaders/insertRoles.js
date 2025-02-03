const mongoose = require("mongoose");
const RoleAccess = require("../../models/acessModel");
const RolesPreloadData = require('../../utils/RolesPreloadData');

const insertRoles = async () => {
  try {
    for (const role of RolesPreloadData) {
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
