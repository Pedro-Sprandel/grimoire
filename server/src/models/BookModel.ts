import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  isbn: { type: String, unique: true },
  publisher: String,
  publishedYear: Number,
  genres: [String],
  pageCount: Number,
  language: String,
  description: String,
  coverImageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const BookModel = mongoose.model("Book", BookSchema);

export default BookModel;
