const express = require("express");
const router = express.Router();
// const isAuthenticated = require("../middleWare/authMiddleware");
const {createBook, getBooks,getBook, deleteBook, updateBook} = require("../controllers/bookController");
const { isAuthenticated, authorizeRoles } = require("../middleWare/authMiddleware");
const { upload } = require("../utils/fileUpload");

router.get("/", getBooks);
router.post("/addBook", isAuthenticated, authorizeRoles('admin'), upload.single("image"), createBook);
router.patch("/update/:id", isAuthenticated, authorizeRoles('admin'), upload.single("image"), updateBook);
router.get("/singleBook/:id", isAuthenticated, getBook);
router.delete("/delete/:id", isAuthenticated, authorizeRoles('admin'), deleteBook);

module.exports = router;