const express = require("express");
const router = express.Router();
const { getBooks,getBook, deleteBook, updateBook, createRatingReview, createBook} = require("../controllFunctions/bookController");
const { isAuthenticated, authorizeBy } = require("../middlefunction/auth");

router.get("/", getBooks);
router.post("/addBook",  createBook);
router.post("/review/:id", createRatingReview);
router.patch("/update/:id", isAuthenticated, updateBook);
router.get("/singleBook/:id", isAuthenticated, getBook);
router.delete("/delete/:id", isAuthenticated,  deleteBook);

module.exports = router;