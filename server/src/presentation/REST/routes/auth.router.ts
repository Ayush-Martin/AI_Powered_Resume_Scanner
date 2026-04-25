
import { Router } from "express";
import { authController } from "../../../infrastructure/container/DI";

const authRouter = Router();

authRouter.post("/register", authController.register);

export default authRouter;
