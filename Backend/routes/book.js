const express = require("express");
const router = express.Router();
const {createBook, getBooks,getBook, deleteBook, updateBook, createRatingReview} = require("../controllFunctions/bookController");
const { isAuthenticated, authorizeBy } = require("../middlefunction/auth");

router.get("/", getBooks);
router.post("/addBook", isAuthenticated, createBook);
router.post("/review/:id", isAuthenticated, createRatingReview);
router.patch("/update/:id", isAuthenticated, updateBook);
router.get("/singleBook/:id", isAuthenticated, getBook);
router.delete("/delete/:id", isAuthenticated,  deleteBook);

module.exports = router;