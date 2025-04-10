import type { Secret, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const generateToken = (payload: {
  id: string;
  email: string;
}): string => {
  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRATION_TIME) {
    throw new Error(
      "JWT_SECRET and JWT_EXPIRATION_TIME must be set in the environment variables",
    );
  }

  const SECRET_KEY: Secret = process.env.JWT_SECRET || "";
  const EXPIRATION_TIME =
    (process.env.JWT_EXPIRATION_TIME as SignOptions["expiresIn"]) || "1h";

  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
};
