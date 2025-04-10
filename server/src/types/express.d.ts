// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload;
  }
}
