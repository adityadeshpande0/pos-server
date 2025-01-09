const Restaurant = require("..//..//models/restaurant/restaurantSchema");
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
    // Use businessAdmin details from the token
    const { _id: businessAdminId } = req.businessAdmin;

    // Check for existing unique fields in Restaurant
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

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create restaurant
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
      businessAdminId, // Automatically associate with the logged-in BusinessAdmin
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
