const express = require("express");
const { GetAllAdmin, MakeAdmin } = require("../controllers/AdminController");
const { isAuthenticated, authorizeBy } = require("../middleWare/authMiddleware");
const router = express.Router();

router.get("/allAdmin", isAuthenticated, authorizeBy('admin'), GetAllAdmin);
router.put("/makeAdmin", isAuthenticated, authorizeBy('admin'), MakeAdmin);


module.exports = router;