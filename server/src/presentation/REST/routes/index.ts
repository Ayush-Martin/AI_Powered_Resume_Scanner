import { Router } from "express";
import { ServerResponseMessages } from "../../../shared/constants/responseMessages";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: ServerResponseMessages.RUNNING });
});

export default apiRouter;
