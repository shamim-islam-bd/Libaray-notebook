const asyncHandler = require("express-async-handler");
const Books = require("../schema/bookModel");

// Create Book
const createBook = asyncHandler(async (req, res) => {
      const { name, author, imageLink, category, price, description } = req.body;
     
      // console.log("hittng", req.body)
    
      //   Validation
      if (!name || !author || !category || !price || !description) {
        res.status(400);
        throw new Error("Please fill in all fields");
      }
    
      // Create Book
      const book = await Books.create({
        // user: req.user.id,
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
  // console.log(req)
  // const books = await Books.find({ user: req.user.id }).sort("-createdAt");
  const books = await Books.find();
  // console.log(books)
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
  console.log("htiing review", rating, review)


  const { id } = req.params;
  console.log(id)

  const book = await Books.findById(id);
  // console.log("book: ", book)

  // if book doesnt exist
  if (!book) {
    res.status(404);
    throw new Error("book not found");
  }

   // creating review info in review array 
  const reviewInfo = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    review,
  };

  console.log("reviewInfo" ,reviewInfo)

  book.reviews.push(reviewInfo);

  // calculating average rating
  // book.numReviews = book.reviews.length;

  // book.rating = book.reviews.reduce((acc, item) => item.rating + acc, 0) / book.reviews.length;

  await book.save();

  //updating book
  const updatedbook = await Books.findByIdAndUpdate( { _id: id }, { reviews: [...book.reviews, reviewInfo], rating: book.rating, numReviews: book.numReviews }, { new: true, runValidators: true, });

  console.log("updatedbook: ", updatedbook)

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
