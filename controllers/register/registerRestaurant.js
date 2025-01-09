const mongoose = require("mongoose");
const Restaurant = require("..//..//models/restaurant/restaurantSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerRestaurant = async (req, res) => {
  const {
    restaurantName,
    ownerName,
    restaurantEmail,
    ownerEmail,
    phoneNumber,
    ownerPhoneNumber,
    gstNumber,
    password,
    profilePicture,
    dateEstablished,
    ownerDOB,
    discount,
  } = req.body;

  try {
    
    const existingRestaurantEmail = await Restaurant.findOne({
      restaurantEmail,
    });
    const existingOwnerEmail = await Restaurant.findOne({ ownerEmail });
    const existingPhoneNumber = await Restaurant.findOne({ phoneNumber });
    const existingOwnerPhoneNumber = await Restaurant.findOne({
      ownerPhoneNumber,
    });
    const existingGstNumber = await Restaurant.findOne({ gstNumber });

    if (existingRestaurantEmail) {
      return res.status(400).json({ message: "Restaurant email already registered" });
    }
    if (existingOwnerEmail) {
      return res.status(400).json({ message: "Owner email already registered" });
    }
    if (existingPhoneNumber) {
      return res.status(400).json({ message: "Phone number already registered" });
    }
    if (existingOwnerPhoneNumber) {
      return res
        .status(400)
        .json({ message: "Owner phone number already registered" });
    }
    if (existingGstNumber) {
      return res.status(400).json({ message: "GST number already registered" });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   
    const restaurant = new Restaurant({
      restaurantName,
      ownerName,
      restaurantEmail,
      ownerEmail,
      phoneNumber,
      ownerPhoneNumber,
      gstNumber,
      profilePicture: profilePicture || "https://www.gravatar.com/avatar/",
      dateEstablished,
      ownerDOB,
      discount,
      authentication: {
        password: hashedPassword,
        salt,
      },
    });

    await restaurant.save();

    const payload = {
      id: restaurant._id,
      role: restaurant.role,
    };

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "Restaurant registered successfully",
      authToken,
      restaurantDetails: {
        id: restaurant._id,
        restaurantName: restaurant.restaurantName,
        ownerName: restaurant.ownerName,
        restaurantEmail: restaurant.restaurantEmail,
        ownerEmail: restaurant.ownerEmail,
        role: restaurant.role,
        status: restaurant.status,
      },
    });
  } catch (error) {
    console.error("Error during restaurant registration:", error.message);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
