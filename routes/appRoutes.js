const express = require("express");
const { regiterUser } = require("../controllers/registerUser");
const authenticateToken = require("../middlewares/authenticateToken");
const { updateAddress } = require("../controllers/updateAddress");
const { loginUser } = require("../controllers/loginUser");
const { getUserProfile } = require("../controllers/user/getUserProfile");
const {
  createNewProduct,
} = require("../controllers/products/createNewProduct");
const { vendorLogin } = require("../controllers/vendor/vendorLogin");
const { vendorRegister } = require("../controllers/vendor/vendorRegister");
const {
  registerRestaurant,
} = require("../controllers/register/registerRestaurant");
const { registerBusinessAdmin } = require("../controllers/business/registerBusinessAdmin");
const router = express.Router();

//POST calls
// router.post("/register-user", regiterUser);
// router.post("/login-user", loginUser);
// router.post("/create-product", authenticateToken, createNewProduct);
// router.post("/vendor-login", vendorLogin);
// router.post("/vendor-register", vendorRegister);
router.post("/register-resturant", registerRestaurant);
router.post("/register-admin-business", registerBusinessAdmin)
//GET calls
// router.get("/user-profile", authenticateToken, getUserProfile);
//PUT calls
// router.put("/update-user-address", authenticateToken, updateAddress);
//DEL calls

module.exports = router;
