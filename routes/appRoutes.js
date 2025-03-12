const express = require("express");

const authenticateToken = require("../middlewares/authenticateToken");

const {
  registerRestaurant,
} = require("../controllers/register/registerRestaurant");
const {
  registerBusinessAdmin,
} = require("../controllers/business/registerBusinessAdmin");
const { loginBusiness } = require("../controllers/business/loginBusiness");
const { verifyBusinessAdmin } = require("../middlewares/verifyBusinessAdmin");
const { loginRestaurant } = require("../controllers/login/loginRestaurant");
const getRoles = require("../controllers/commons/getRoles");
const getBusinessAdminInfo = require("../controllers/commons/getBusinessAdminInfo");
const getAllRestaurantList = require("../controllers/business/getAllRestaurantList");

const router = express.Router();

//POST calls
router.post("/register-resturant", verifyBusinessAdmin, registerRestaurant);
router.post("/login-restaurant", loginRestaurant);
router.post("/register-business-admin", registerBusinessAdmin);
router.post("/login-business", loginBusiness);

//GET calls
router.get("/get-roles/roleName=:roleName", getRoles);
router.get("/get-all-roles", getRoles.getAllRoles);
router.get(
  "/get-user-businessadmin",
  verifyBusinessAdmin,
  getBusinessAdminInfo
);
router.get("/get-all-restaurants", verifyBusinessAdmin, getAllRestaurantList.getAllRestaurantList);
router.get("/get-restaurant-details/:restaurantId", verifyBusinessAdmin, getAllRestaurantList.getRestaurantDetails);
//PUT calls

//DEL calls

module.exports = router;
