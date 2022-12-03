const express = require("express");
const router = express.Router();
// const isAuthenticated = require("../middleWare/authMiddleware");
const {createBook, getBooks,getBook, deleteBook, updateBook} = require("../controllers/bookController");
const { isAuthenticated } = require("../middleWare/authMiddleware");
const { upload } = require("../utils/fileUpload");

router.post("/addBook", isAuthenticated, upload.single("image"), createBook);
router.patch("/update/:id", isAuthenticated, upload.single("image"), updateBook);
router.get("/getBooks", isAuthenticated, getBooks);
router.get("/singleBook/:id", isAuthenticated, getBook);
router.delete("/delete/:id", isAuthenticated, deleteBook);

module.exports = router;