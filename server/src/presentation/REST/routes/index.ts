import { Router } from "express";
import { ServerResponseMessages } from "../../../shared/constants/responseMessages";
import authRouter from "./auth.router";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: ServerResponseMessages.RUNNING });
});

apiRouter.use("/auth", authRouter);

export default apiRouter;
