const Restaurant = require("../../models/restaurant/restaurantSchema");
const BusinessAdmin = require("../../models/business/businessAdmin");
const bcrypt = require("bcryptjs");
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
    const { _id: businessAdminId } = req.businessAdmin;

    const existingFields = await BusinessAdmin.findOne({
      $or: [
        { restaurantEmail },
        { ownerEmail },
        { phoneNumber },
        { ownerPhoneNumber },
      ],
    });

    if (existingFields) {
      return res.status(400).json({ message: "The email is already registered!" });
    }

    const existingRestaurant = await Restaurant.findOne({
      $or: [
        { restaurantEmail },
        { ownerEmail },
        { phoneNumber },
        { ownerPhoneNumber },
        { gstNumber },
      ],
    });

    if (existingRestaurant) {
      return res.status(400).json({ message: "Unique fields already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newRestaurant = new Restaurant({
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
      businessAdminId,
      authentication: {
        password: hashedPassword,
        salt,
      },
    });

    await newRestaurant.save();

    res.status(201).json({
      message: "Restaurant registered successfully",
      restaurantDetails: {
        id: newRestaurant._id,
        restaurantName: newRestaurant.restaurantName,
        ownerName: newRestaurant.ownerName,
        businessAdminId: newRestaurant.businessAdminId,
      },
    });
  } catch (error) {
    console.error("Error registering restaurant:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
