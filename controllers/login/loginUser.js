const BusinessAdmin = require("../../models/business/businessAdmin");
const Restaurant = require("../../models/restaurant/restaurantSchema");
const Role = require("../../models/acessModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    let user = await BusinessAdmin.findOne({ businessEmail: email });
    let userType = "BUSINESS_ADMIN";

    if (!user) {
      user = await Restaurant.findOne({ restaurantEmail: email });
      userType = "STORE_ADMIN";
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "Account is inactive. Please contact support." });
    }

    const passwordField = userType === "BUSINESS_ADMIN" ? "authentication.hashPassword" : "authentication.password";
    const isMatch = await bcrypt.compare(password, user.authentication[passwordField.split(".")[1]]);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const role = userType === "BUSINESS_ADMIN" ? await Role.findOne({ roleName: "BUSINESS_ADMIN" }) : null;
    if (userType === "BUSINESS_ADMIN" && !role) {
      return res.status(500).json({ message: "Role not found in system" });
    }

    const payload = { id: user.id, userType };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: userType === "BUSINESS_ADMIN" ? "15d" : "10d",
    });

    user.authentication.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      message: "Login successful",
      authToken: token,
      userDetails: {
        id: user.id,
        name: userType === "BUSINESS_ADMIN" ? user.businessName : user.restaurantName,
        email: userType === "BUSINESS_ADMIN" ? user.businessEmail : user.restaurantEmail,
        role: user.role,
        status: user.status,
        userType,
      },
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
