const Vendor = require("..//..//models/vendorSchema");
const User = require("..//..//models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.vendorRegister = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;

  try {
    let vendorEmail = await Vendor.findOne({ email });
    let vendorPhoneNumber = await Vendor.findOne({ phoneNumber });
    let userEmail = await User.findOne({ email });
    let userPhoneNumber = await User.findOne({ phoneNumber });
   
    if (vendorEmail || userEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }
    if (vendorPhoneNumber || userPhoneNumber) {
      return res
        .status(400)
        .json({ message: "Phone Number already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    vendor = new Vendor({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await vendor.save();

    const payload = {
      vendor: {
        id: vendor.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          message: "Vendor Registered Successfully !",
          authToken: token,
          id: vendor.id,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};
