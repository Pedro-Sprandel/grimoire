import { Router } from "express";
import { addReviewController } from "./review.controller.ts";
import { validateAddReviewBody } from "./review.middleware.ts";

const router = Router();

router.post("/", validateAddReviewBody, addReviewController);

export default router;
