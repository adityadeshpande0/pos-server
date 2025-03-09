const RestaurantSchema = require("../../models/restaurant/restaurantSchema");
const BusinessAdmin = require("../../models/business/businessAdmin");

const getAllRestaurantList = async (req, res) => {
  try {
    const { businessAdminId } = req.params;
    const restaurants = await RestaurantSchema.find({ businessAdmin: businessAdminId });
    res.status(200).json(restaurants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving restaurant list", error });
  }
};

module.exports = getAllRestaurantList;
