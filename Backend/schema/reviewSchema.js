const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
    rating: {
      type: Number,
      required: [true, "Please add a rating"],
      trim: true,
    },
    review: {
      type: String,
      required: [true, "Please add a review"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
