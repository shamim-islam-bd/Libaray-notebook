const express = require("express");
const { GetAllAdmin, MakeAdmin } = require("../controllers/AdminController");
const { isAuthenticated, authorizeRoles } = require("../middleWare/authMiddleware");
const router = express.Router();

router.get("/allAdmin", isAuthenticated, authorizeRoles('admin'), GetAllAdmin);
router.put("/makeAdmin", isAuthenticated, authorizeRoles('admin'), MakeAdmin);


module.exports = router;