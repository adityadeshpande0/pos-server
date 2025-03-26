const Restaurant = require("..//..//models/restaurant/restaurantSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginRestaurant = async (req, res) => {
  const { restaurantEmail, password } = req.body;
  try {
    if (!restaurantEmail || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }
    const restaurant = await Restaurant.findOne({ restaurantEmail });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    if (restaurant.status !== "active") {
      return res
        .status(403)
        .json({ message: "Account is inactive. Please contact support." });
    }
    const isMatch = await bcrypt.compare(
      password,
      restaurant.authentication.password
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const payload = {
      restaurant: {
        id: restaurant.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "10d" },
      async (err, token) => {
        if (err) throw err;
        restaurant.authentication.lastLogin = new Date();
        await restaurant.save();
        res.status(200).json({
          message: "Login successful",
          authToken: token,
          restaurantDetails: {
            id: restaurant.id,
            restaurantName: restaurant.restaurantName,
            restaurantEmail: restaurant.restaurantEmail,
            role: restaurant.role,
            status: restaurant.status,
          },
        });
      }
    );
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
