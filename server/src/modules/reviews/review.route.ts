import { Router } from "express";
import {
  addReviewController,
  getUserReviewController
} from "./review.controller.ts";
import { validateAddReviewBody } from "./review.middleware.ts";

const router = Router();

router.get("/:bookId", getUserReviewController);
router.post("/", validateAddReviewBody, addReviewController);

export default router;
