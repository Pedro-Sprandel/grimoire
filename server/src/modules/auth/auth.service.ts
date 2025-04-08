import createHttpError from "http-errors";
import { findUserByEmailOrUsername, insertUser } from "./auth.repository.ts";
import bcrypt from "bcrypt";

export const registerUser = async (username: string, email: string, password: string) => {
  if (!username || !password) {
    throw new Error("Credentials required");
  }

  const existingUser = await findUserByEmailOrUsername(email, username);
  if (existingUser) {
    throw createHttpError(409, "Username or email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await insertUser(username, email, hashedPassword);
};