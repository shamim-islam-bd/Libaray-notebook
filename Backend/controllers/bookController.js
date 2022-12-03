const asyncHandler = require("express-async-handler");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;
const Books = require("../models/bookModel");

// Create Book
const createBook = asyncHandler(async (req, res) => {
  const { name, rating, discount, category, quantity, price, description } = req.body;

  //   Validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Inventory App",
        resource_type: "image",
        api_name: process.env.CLOUDINARY_NAME,
        api_secrect_key: process.env.CLOUDINARY_SECRET_KEY,
        api_Key: process.env.CLOUDINARY_API_KEY,
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Book
  const book = await Books.create({
    user: req.user.id,
    name,
    rating,
    discount,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });

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
  const { name, category, quantity, price, description } = req.body;
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

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Inventory App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update book
  const updatedbook = await Books.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? book?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedbook);
});

module.exports = {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
};
