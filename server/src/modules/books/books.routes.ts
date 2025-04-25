import { Router } from "express";
import {
  addReviewController,
  getAllReviewsController,
  getBookByIdController,
  getBooksController
} from "./books.controller.ts";
import { validateMongoIdFromParam } from "../../middlewares/validateMongoId.ts";
import { getUserReviewController } from "../books/books.controller.ts";
import { validateAddReviewBody } from "./books.middleware.ts";

const router = Router();

router.get("/", getBooksController);
router.get("/:id", validateMongoIdFromParam, getBookByIdController);
router.get(
  "/:bookId/reviews",
  validateMongoIdFromParam,
  getAllReviewsController
);
router.get("/:bookId/reviews/mine", getUserReviewController);
router.post("/:bookId/reviews", validateAddReviewBody, addReviewController);

export default router;
