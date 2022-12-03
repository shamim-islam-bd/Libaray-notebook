const express = require("express");
const router = express.Router();
const { upload } = require("../utils/fileUpload");
const CheckAuth = require("../middleWare/authMiddleware");

const {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
} = require("../controllers/booksController");

router.post("/addBook", CheckAuth, upload.single("image"), createBook);
router.patch("/update/:id", CheckAuth, upload.single("image"), updateBook);
router.get("/books", CheckAuth, getBooks);
router.get("/book/:id", CheckAuth, getBook);
router.delete("/delete/:id", CheckAuth, deleteBook);

module.exports = router;
