const mongoose = require("mongoose");
const insertRoles = require("../controllers/preloaders/insertRoles");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT_URL);
    console.log("Database Connection Success!");

    // ✅ Now call insertRoles AFTER connection is established
    await insertRoles();
  } catch (error) {
    console.log("We encountered an error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
