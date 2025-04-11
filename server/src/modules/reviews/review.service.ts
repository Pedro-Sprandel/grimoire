import createHttpError from "http-errors";
import User from "../../models/UserModel.ts";

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
  const user = await User.findById(userId).select("books");
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
