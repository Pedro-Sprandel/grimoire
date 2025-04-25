import ReviewModel from "../../models/ReviewModel.ts";
import User from "../../models/UserModel.ts";

export const addReview = async (payload: {
  userId: string;
  bookId: string;
  title?: string;
  comment?: string;
  rating: number;
}) => {
  const existingReview = await ReviewModel.findOne({
    bookId: payload.bookId,
    userId: payload.userId
  });

  if (existingReview) {
    throw new Error("Usuário já fez review para este livro");
  }

  return ReviewModel.create({
    userId: payload.userId,
    bookId: payload.bookId,
    title: payload.title,
    comment: payload.comment,
    rating: payload.rating
  });
};

export const getUserBooks = (userId: string) => {
  return User.findById(userId).select("books");
};
