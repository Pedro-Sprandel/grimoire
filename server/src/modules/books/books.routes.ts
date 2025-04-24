import { Router } from "express";
import {
  getBookByIdController,
  getBooksController
} from "./books.controller.ts";
import { validateMongoIdFromParam } from "../../middlewares/validateMongoId.ts";

const router = Router();

router.get("/", getBooksController);
router.get("/:id", validateMongoIdFromParam, getBookByIdController);

export default router;
