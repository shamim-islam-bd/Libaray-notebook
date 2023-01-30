const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  getAllUser,
} = require("../controllFunctions/userController");
const { isAuthenticated } = require("../middlefunction/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getUser); // current User
router.get("/", getAllUser); 
router.get("/loggedin", isAuthenticated, loginStatus);

module.exports = router;
