import { Router } from "express";
import { validateLoginBody, validateRegisterBody } from "./auth.middleware.ts";
import {
  getMeController,
  loginController,
  logoutController,
  registerUserController
} from "./auth.controller.ts";
import { authenticateJWT } from "../../middlewares/authMiddleware.ts";

const router = Router();

router.post(
  "/register",
  authenticateJWT,
  validateRegisterBody,
  registerUserController
);
router.post("/logout", authenticateJWT, logoutController);
router.post("/login", validateLoginBody, loginController);
router.get("/me", authenticateJWT, getMeController);

export default router;
