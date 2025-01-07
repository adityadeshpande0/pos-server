const Vendor = require("..//..//models/vendorSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = "30d";

const vendorLogin = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const vendor = await Vendor.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }],
    });

    if (!vendor) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, vendor.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid email/phone number or password" });
    }

    const token = jwt.sign(
      {
        userId: vendor._id,
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      vendor: {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        phoneNumber: vendor.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  vendorLogin,
};
