const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT_URL);
    console.log("Database Connection Success !");
  } catch (error) {
    console.log("We encountered an error : ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;