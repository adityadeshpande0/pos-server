const mongoose = require("mongoose");
const BusinessAdmin = require("..//../models/business/businessAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerBusinessAdmin = async (req, res) => {
  const {
    businessName,
    businessEmail,
    businessPhoneNumber,
    password,
    profilePicture,
  } = req.body;

  try {
    // Check for existing email or phone number
    const existingEmail = await BusinessAdmin.findOne({ businessEmail });
    const existingPhone = await BusinessAdmin.findOne({ businessPhoneNumber });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create the BusinessAdmin instance
    const businessAdmin = new BusinessAdmin({
      businessName,
      businessEmail,
      businessPhoneNumber,
      profilePicture: profilePicture || "https://www.gravatar.com/avatar/",
      authentication: {
        hashPassword,
        salt,
      },
    });

    // Save to the database
    await businessAdmin.save();

    // Generate a JWT token
    const payload = {
      id: businessAdmin._id,
      role: businessAdmin.role,
    };

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the response
    res.status(201).json({
      message: "Business Admin registered successfully",
      authToken,
      adminDetails: {
        id: businessAdmin._id,
        businessName: businessAdmin.businessName,
        businessEmail: businessAdmin.businessEmail,
        role: businessAdmin.role,
        status: businessAdmin.status,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
