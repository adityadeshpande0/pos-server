const Restaurant = require("../../models/restaurant/restaurantSchema");
const Role = require("../../models/acessModel");
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
    const businessAdminId = req.businessAdmin?._id;
    if (!businessAdminId) {
      return res.status(400).json({ message: "Business Admin not found" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const role = await Role.findOne({ roleName: "STORE_ADMIN" });
    if (!role) {
      return res.status(400).json({ message: "Role not found" });
    }

    // Check if restaurant already exists
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
      return res
        .status(400)
        .json({ message: "One or more fields already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newRestaurant = new Restaurant({
      restaurantName,
      ownerName,
      restaurantEmail,
      ownerEmail,
      phoneNumber,
      roleId: role._id,
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
    console.error("Error registering restaurant:", error);
    res.status(500).json({ message: "Server error" });
  }
};
