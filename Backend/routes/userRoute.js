const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middleWare/authMiddleware");
// const isAuthenticated = require("../middleWare/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getUser); // current User
router.get("/loggedin", isAuthenticated, loginStatus);
router.patch("/updateuser", isAuthenticated, updateUser);
router.patch("/changepassword", isAuthenticated, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;
