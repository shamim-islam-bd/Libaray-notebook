const express = require("express");
const { contactUs } = require("../controllers/contactController");
const { isAuthenticated } = require("../middleWare/authMiddleware");
const router = express.Router();
// const protect = require("../middleWare/authMiddleware");

router.post("/", isAuthenticated, contactUs);

module.exports = router;
