// https://www.youtube.com/watch?v=d7G0E_9FwyE
//https://www.youtube.com/watch?v=d7G0E_9FwyE
const User = require("../models/userSchema");

exports.updateAddress = async (req, res) => {
  const userId = req.user.id;
  const { street, city, state, pincode, loaction } = req.body;

  if (!street || !city || !state || !location) {
    return res.status(400).json({
      message: "All fields are required !",
    });
  }

  if (
    location &&
    (typeof location.latitude !== "number" ||
      typeof location.longitude !== "number")
  ) {
    return res.status(400).json({
      message:
        "Invalid location coordinates. Latitude and Longitude must be numbers.",
    });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          address: {
            street,
            city,
            state,
            pincode,
            location: location || {},
          },
        },
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Address updated successfully",
      address: updatedUser.address,
    });
  } catch (error) {
    console.error("Error updating address:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
