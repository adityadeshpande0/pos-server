const BusinessAdmin = require("../../models/business/businessAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../../models/acessModel");
const { promisify } = require("util");
require("dotenv").config();

exports.loginBusiness = async (req, res) => {
  const { businessEmail, password } = req.body;

  try {
    if (!businessEmail || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const admin = await BusinessAdmin.findOne({ businessEmail });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.status !== "active") {
      return res
        .status(403)
        .json({ message: "Account is inactive. Please contact support." });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.authentication.hashPassword
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Ensure role exists
    const role = await Role.findOne({ roleName: "BUSINESS_ADMIN" });
    if (!role) {
      return res.status(500).json({ message: "Role not found in system" });
    }

    // Use only the ID string for JWT payload
    const payload = { admin: admin.id.toString() };

    // Sign JWT with longer expiration time
    const signAsync = promisify(jwt.sign);
    const token = await signAsync(payload, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    // Update last login time
    admin.authentication.lastLogin = new Date();
    await admin.save();

    res.status(200).json({
      message: "Login successful",
      authToken: token,
      adminDetails: {
        roleName: role.roleName,
        id: admin.id,
        businessName: admin.businessName,
        businessEmail: admin.businessEmail,
        role: admin.role,
        status: admin.status,
      },
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
