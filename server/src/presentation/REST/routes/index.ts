import { Router } from "express";
import { ServerResponseMessages } from "../../../shared/constants/responseMessages";
import authRouter from "./auth.router";
import jobRoleRouter from "./jobRole.router";
import scanReportRouter from "./scanReport.router";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: ServerResponseMessages.RUNNING });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/jobRoles", jobRoleRouter);
apiRouter.use("/scanReports", scanReportRouter);

export default apiRouter;
