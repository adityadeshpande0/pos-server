const User = require("../models/userSchema");
const Vendor = require("..//models/vendorSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.regiterUser = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;

  try {
    let vendorEmail = await Vendor.findOne({ email });
    let vendorPhoneNumber = await Vendor.findOne({ phoneNumber });
    let userEmail = await User.findOne({ email });
    let userPhoneNumber = await User.findOne({ phoneNumber });
    if (userEmail || vendorEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }
    if (userPhoneNumber || vendorPhoneNumber) {
      return res
        .status(400)
        .json({ message: "Phone Number already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          message: "User Registered Successfully !",
          authToken: token,
          id: user.id,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};
