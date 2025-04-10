import createHttpError from "http-errors";
import { findUserByEmailOrUsername, insertUser } from "./auth.repository.ts";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt.ts";
import type { Response } from "express";

export const registerUser = async (username: string, email: string, password: string) => {
  if (!username || !password) {
    throw createHttpError(400, "Credentials required");
  }

  const existingUser = await findUserByEmailOrUsername(email, username);
  if (existingUser) {
    throw createHttpError(409, "Username or email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await insertUser(username, email, hashedPassword);
};

export const loginUser = async (email: string, password: string, res: Response) => {
  if (!email || !password) {
    throw createHttpError(400, "Credentials required");
  }

  const user = await findUserByEmailOrUsername(email);
  if (!user) {
    throw createHttpError(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, "Invalid credentials");
  }

  const token = generateToken({id: user._id.toString(), email: user.email});

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000
  });

  const { password: _, ...userWithoutPassword } = user.toObject();

  return userWithoutPassword;
};