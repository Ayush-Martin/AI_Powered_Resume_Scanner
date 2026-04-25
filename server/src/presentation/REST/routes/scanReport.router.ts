import { Router } from "express";
import {
  pdfStorageMiddleware,
  scanReportController,
  userAuthMiddleware,
} from "../../../infrastructure/container/DI";

const scanReportRouter = Router();

scanReportRouter.use(userAuthMiddleware.accessTokenValidator);

scanReportRouter
  .route("/")
  .get(scanReportController.getScanReports)
  .post(pdfStorageMiddleware.execute, scanReportController.createScanReport);

scanReportRouter.route("/:id").get(scanReportController.getScanReport);

export default scanReportRouter;
