const RestaurantSchema = require("../../models/restaurant/restaurantSchema");
const BusinessAdmin = require("../../models/business/businessAdmin");

const getAllRestaurantList = async (req, res) => {
  try {
    const businessAdminId = req.businessAdmin.id;
    console.log(businessAdminId)
    const restaurants = await RestaurantSchema.find({
      businessAdminId,
    });
    res.status(200).json(
      restaurants.map((restaurant) => {
        return {
          id: restaurant._id,
          restaurantName: restaurant.restaurantName,
          restaurantEmail: restaurant.restaurantEmail,
          restaurantPhoneNumber: restaurant.phoneNumber,
          gstNumber: restaurant.gstNumber,
          restaurantProfilePicture: restaurant.profilePicture,
          status: restaurant.status,
          roleId: restaurant.roleId,
          ownerName: restaurant.ownerName,
          ownerEmail: restaurant.ownerEmail,
          ownerPhoneNumber: restaurant.ownerPhoneNumber,
          restaurantPermission:restaurant.permissions,
          createdAt: restaurant.createdAt,
          updatedAt: restaurant.updatedAt,
        };
      })
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving restaurant list", error });
  }
};

module.exports = getAllRestaurantList;
