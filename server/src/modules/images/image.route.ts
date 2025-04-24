import { Router } from "express";
import { getImageController } from "./image.controller.ts";

const router = Router();

router.get("/:url", getImageController);

export default router;
