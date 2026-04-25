import { Router } from "express";
import {
  pdfStorageMiddleware,
  scanReportController,
  userAuthMiddleware,
} from "../../../infrastructure/container/DI";

const scanReportRouter = Router();

scanReportRouter.use(userAuthMiddleware.accessTokenValidator);

scanReportRouter.post(
  "/",
  pdfStorageMiddleware.execute,
  scanReportController.createScanReport,
);

export default scanReportRouter;
