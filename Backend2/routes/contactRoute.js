const express = require("express");
const { contactUs } = require("../controllers/contactController");
const CheckAuth = require("../middleWare/authMiddleware");
const router = express.Router();

router.post("/", CheckAuth, contactUs);

module.exports = router;
