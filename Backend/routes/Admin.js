const express = require("express");
const { GetAllAdmin, MakeAdmin } = require("../controllFunctions/AdminController");
const { isAuthenticated, authorizeBy } = require("../middlefunction/auth");
const router = express.Router();

router.get("/allAdmin", isAuthenticated, authorizeBy('admin'), GetAllAdmin);
router.put("/makeAdmin", isAuthenticated, authorizeBy('admin'), MakeAdmin);


module.exports = router;