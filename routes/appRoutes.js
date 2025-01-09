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
const router = express.Router();

//POST calls
router.post("/register-resturant", verifyBusinessAdmin, registerRestaurant);
router.post("/register-admin-business", registerBusinessAdmin);
router.post("/login-business", loginBusiness);
//GET calls

//PUT calls

//DEL calls

module.exports = router;
