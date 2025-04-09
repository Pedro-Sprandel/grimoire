import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  books: [{
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    },
    title: String,
    checkoutDate: {
      type: Date,
      default: Date.now
    },
    returnDate: Date
  }]
});

const User = mongoose.model("User", userSchema);

export default User;

