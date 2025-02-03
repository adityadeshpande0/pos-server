const BusinessAdmin = require("..//../models/business/businessAdmin");
const Role = require("../../models/acessModel");
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
    const existingEmail = await BusinessAdmin.findOne({ businessEmail });
    const existingPhone = await BusinessAdmin.findOne({ businessPhoneNumber });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "Phone number already registered" });
    }

    const role = await Role.findOne({ roleName: "BUSINESS_ADMIN" });
    if (!role) {
      return res.status(400).json({ message: "Role not found" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const businessAdmin = new BusinessAdmin({
      businessName,
      businessEmail,
      businessPhoneNumber,
      roleId: role._id,
      profilePicture: profilePicture || "https://www.gravatar.com/avatar/",
      authentication: {
        hashPassword,
        salt,
      },
    });

    await businessAdmin.save();

    const payload = {
      id: businessAdmin._id,
      role: businessAdmin.roleId,
    };

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      message: "Business Admin registered successfully",
      authToken,
      adminDetails: {
        id: businessAdmin._id,
        businessName: businessAdmin.businessName,
        businessEmail: businessAdmin.businessEmail,
        role: businessAdmin.role,
        roleName: role.roleName,
        status: businessAdmin.status,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
