import createHttpError from "http-errors";
import { getUserBooks } from "./review.repository.ts";

/**
 * Verifica se o usuário existe e se o bookId já está associado a ele.
 * @param userId - ID do usuário
 * @param bookId - ID do livro
 * @throws {HttpError} - Lança erro se o usuário não for encontrado ou se o bookId já existir
 */
export const validateUniqueBookForUser = async (
  userId: string,
  bookId: string
) => {
  const user = await getUserBooks(userId);
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const bookExists = user.books.some(
    (book) => book.bookId.toString() === bookId
  );
  if (bookExists) {
    throw createHttpError(409, "Book ID must be unique for this user");
  }
};

export const getUserReview = async (userId: string, bookId: string) => {
  const user = await getUserBooks(userId);
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const review = user.books.find((book) => book.bookId.toString() === bookId);

  return review;
};
