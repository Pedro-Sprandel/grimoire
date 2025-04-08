import type { Secret, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const SECRET_KEY: Secret = process.env.JWT_SECRET || "abcd1234";
const EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME as SignOptions["expiresIn"] || "1h";

export const generateToken = (payload: { id: string, email: string }): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
};