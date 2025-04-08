import { Router } from "express";
import type { Request, Response } from "express";
import authRouter from "./modules/auth/auth.routes.ts";
import { handleError } from "./middlewares/errorHandler.ts";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({ message: "API is running..."});
});

router.use(authRouter);

router.use(handleError);

export default router;