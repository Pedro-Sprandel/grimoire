import { Router } from "express";
import { authenticateJWT } from "./middlewares/authMiddleware.ts";
import { handleError } from "./middlewares/errorMiddleware.ts";
import authRouter from "./modules/auth/auth.routes.ts";
import booksRouter from "./modules/books/books.routes.ts";
import reviewsRouter from "./modules/reviews/review.route.ts";
import imagesRouter from "./modules/images/image.route.ts";

const router = Router();

router.use(authRouter);
router.use(authenticateJWT);
router.use("/image", imagesRouter);
router.use("/books", booksRouter);
router.use("/reviews", reviewsRouter);
router.use(handleError);

export default router;
