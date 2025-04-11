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
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
        unique: true
      },
      title: {
        type: String,
        trim: true
      },
      comment: {
        type: String,
        trim: true
      },
      rating: {
        type: Number,
        min: 0.5,
        max: 5,
        required: true
      }
    }
  ]
});

const User = mongoose.model("User", userSchema);

export default User;
