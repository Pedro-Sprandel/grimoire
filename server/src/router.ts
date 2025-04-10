import { Router } from "express";
import type { Request, Response } from "express";
import authRouter from "./modules/auth/auth.routes.ts";
import { handleError } from "./middlewares/errorMiddleware.ts";
import booksRouter from "./modules/books/books.routes.ts";
import { getImageController } from "./modules/images/image.controller.ts";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({ message: "API is running..." });
});

router.get("/image", getImageController);
router.use(authRouter);
router.use("/books", booksRouter);
router.use(handleError);

export default router;
