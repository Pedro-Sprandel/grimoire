import { Router } from "express";
import { validateRegisterBody } from "./auth.middleware.ts";
import { registerUserController } from "./auth.controller.ts";

const router = Router();

router.post("/register", validateRegisterBody, registerUserController);

export default router;
