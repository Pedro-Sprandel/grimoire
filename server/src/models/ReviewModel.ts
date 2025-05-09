import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, min: 0.5, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const ReviewModel = mongoose.model("Review", ReviewSchema);

export default ReviewModel;
