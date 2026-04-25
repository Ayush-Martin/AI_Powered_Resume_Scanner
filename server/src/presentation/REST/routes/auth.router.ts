import { Router } from "express";
import {
  authController,
  userAuthMiddleware,
} from "../../../infrastructure/container/DI";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

authRouter.post(
  "/refresh",
  userAuthMiddleware.refreshTokenValidator,
  authController.refresh,
);

export default authRouter;
