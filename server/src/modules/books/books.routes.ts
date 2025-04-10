import { Router } from "express";
import {
  getBookByIdController,
  getBooksController,
} from "./books.controller.ts";

const router = Router();

router.get("/", getBooksController);
router.get("/:id", getBookByIdController);

export default router;
