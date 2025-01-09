const express = require("express");

const authenticateToken = require("../middlewares/authenticateToken");

const {
  registerRestaurant,
} = require("../controllers/register/registerRestaurant");
const {
  registerBusinessAdmin,
} = require("../controllers/business/registerBusinessAdmin");
const router = express.Router();

//POST calls
router.post("/register-resturant", registerRestaurant);
router.post("/register-admin-business", registerBusinessAdmin);
//GET calls

//PUT calls

//DEL calls

module.exports = router;
