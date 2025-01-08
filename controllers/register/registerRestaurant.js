const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerRestaurant = async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    password,
    role,
    profilePicture,
    birthday,
  } = req.body;

  try {

    if (!name || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const validRoles = ["superAdmin", "hotelAdmin", "manager", "waiter", "cashier"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: `Role must be one of: ${validRoles.join(", ")}` });
    }

    const userEmail = await User.findOne({ email });
    const userPhoneNumber = await User.findOne({ phoneNumber });

    if (userEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }
    if (userPhoneNumber) {
      return res.status(400).json({ message: "Phone Number already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phoneNumber,
      role,
      profilePicture: profilePicture || "https://www.gravatar.com/avatar/",
      birthday,
      authentication: {
        password: hashedPassword,
        salt: salt,
      },
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
        if (err) {
          console.error("JWT generation error:", err.message);
          return res.status(500).json({ message: "Token generation failed" });
        }

        res.status(201).json({
          message: "User Registered Successfully!",
          authToken: token,
          id: user.id,
        });
      }
    );
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
