const mongoose = require("mongoose");

const BooksSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Please add an author"],
      trim: true,
    },
    imageLink: {
      type: String,
      required: [true, "Please add an image"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      trim: true,
    },
   BookDocument : {
    type : Object,
    default : {},
    ref : "Document"
   },
  },
  {
    timestamps: true,
  }
);

const Books = mongoose.model("Books", BooksSchema);
module.exports = Books;
