const asyncHandler = require("express-async-handler");
const Books = require("../models/bookModel");

// Create Book
const createBook = asyncHandler(async (req, res) => {
  const { name, author, imageLink, category, price, description } = req.body;

  // console.log(req.body)

  //   Validation
  if (!name || !author || !category || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Book
  const book = await Books.create({
    user: req.user.id,
    name,
    author,
    imageLink,
    category,
    price,
    description,
  });

  // console.log(book)

  res.status(201).json(book);
});

// Get all Books
const getBooks = asyncHandler(async (req, res) => {
  // const books = await Books.find({ user: req.user.id }).sort("-createdAt");
  const books = await Books.find();
  res.status(200).json(books);
});

// Get single book
const getBook = asyncHandler(async (req, res) => {
  const book = await Books.findById(req.params.id);
  // if book doesnt exist
  if (!book) {
    res.status(404);
    throw new Error("book not found");
  }
  // Match book to its user
  if (book.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(book);
});

// Delete book
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Books.findById(req.params.id);
  // if book doesnt exist
  if (!book) {
    res.status(404);
    throw new Error("book not found");
  }
  // Match book to its user
  if (book.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await book.remove();
  res.status(200).json({ message: "book deleted." });
});

// Update book
const updateBook = asyncHandler(async (req, res) => {
  const { name, imageLink, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const book = await Books.findById(id);

  // if book doesnt exist
  if (!book) {
    res.status(404);
    throw new Error("book not found");
  }
  // Match book to its user
  if (book.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Update book
  const updatedbook = await Books.findByIdAndUpdate(
    { _id: id },
    {
      name,
      imageLink,
      category,
      quantity,
      price,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedbook);
});


// create user rating and review

const createRatingReview = asyncHandler(async (req, res) => {
  const { rating, review } = req.body;
  const { id } = req.params;

  const book = await Books.findById(id);

  // if book doesnt exist
  if (!book) {
    res.status(404);
    throw new Error("book not found");
  }

  // Update book
  const updatedbook = await Books.findByIdAndUpdate( { _id: id }, { rating, review }, { new: true, runValidators: true } );

  res.status(200).json(updatedbook);
});






module.exports = {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
  createRatingReview,
};
