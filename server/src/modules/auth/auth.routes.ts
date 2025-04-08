import { Router } from "express";
import { validateLoginBody, validateRegisterBody } from "./auth.middleware.ts";
import { loginController, registerUserController } from "./auth.controller.ts";

const router = Router();

router.post("/register", validateRegisterBody, registerUserController);
router.post("/login", validateLoginBody, loginController);

export default router;
