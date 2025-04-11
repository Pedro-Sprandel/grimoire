import User from "../../models/UserModel.ts";

export const addReviewToUser = (
  userId: string,
  payload: {
    bookId: string;
    title?: string;
    comment?: string;
    rating: number;
  }
) => {
  return User.findByIdAndUpdate(
    userId,
    {
      $push: {
        books: payload
      }
    },
    {
      new: true,
      runValidators: true
    }
  );
};
