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
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      trim: true,
    },
    discount: {
      type: Number,
      default: 10.00,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Books = mongoose.model("Books", BooksSchema);
module.exports = Books;
