import { Router } from "express";
import { getBooksController } from "./books.controller.ts";

const router = Router();

router.get("/", getBooksController);

export default router;