const express = require("express");
const router = express.Router();
// const isAuthenticated = require("../middleWare/authMiddleware");
const {createBook, getBooks,getBook, deleteBook, updateBook, createRatingReview} = require("../controllers/bookController");
const { isAuthenticated, authorizeBy } = require("../middleWare/authMiddleware");
const { upload } = require("../utils/fileUpload");

router.get("/", getBooks);
router.post("/addBook", isAuthenticated, authorizeBy('admin'), upload.single("image"), createBook);
router.post("/review", isAuthenticated, createRatingReview);
router.patch("/update/:id", isAuthenticated, authorizeBy('admin'), upload.single("image"), updateBook);
router.get("/singleBook/:id", isAuthenticated, getBook);
router.delete("/delete/:id", isAuthenticated, authorizeBy('admin'), deleteBook);

module.exports = router;