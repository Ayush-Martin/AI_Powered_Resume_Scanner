import { Request, Response, NextFunction } from "express";
import { binder } from "../../../shared/utils/binder";
import { inject } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { ICreateScanReportUseCase } from "../../../application/interface/useCases/scanReport/ICreateScanReport.useCase";
import { FrowardCreateScanReportDto } from "../../../application/DTO/scanReport/createScanReport.dto";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { successResponse } from "../../../shared/utils/responseCreator";
import { IGetScanReportUseCase } from "../../../application/interface/useCases/scanReport/IGetScanReport.useCase";
import { IGetScanReportsUseCase } from "../../../application/interface/useCases/scanReport/IGetScanReports.useCase";

class ScanReportController {
  constructor(
    @inject(TYPES.CreateScanReportUseCase)
    private readonly _createScanReportUseCase: ICreateScanReportUseCase,
    @inject(TYPES.GetScanReportUseCase)
    private readonly _getScanReportUseCase: IGetScanReportUseCase,
    @inject(TYPES.GetScanReportsUseCase)
    private readonly _getScanReportsUseCase: IGetScanReportsUseCase,
  ) {
    binder(this);
  }

  public async createScanReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.userId!;
      const { jobRoleId } = req.body;
      const resumeBuffer = req.file?.buffer;

      if (!resumeBuffer) {
        throw new Error(
          "No PDF file uploaded. Please upload a valid resume in PDF format.",
        );
      }

      const dto = new FrowardCreateScanReportDto(
        userId,
        jobRoleId,
        resumeBuffer,
      );

      const data = await this._createScanReportUseCase.execute(dto);

      res
        .status(StatusCodes.CREATED)
        .json(successResponse("Scan report created successfully.", data));
    } catch (error) {
      next(error);
    }
  }

  public async getScanReport(req: Request, res: Response, next: NextFunction) {
    try {
      const scanReportId = Number(req.params.id);
      const data = await this._getScanReportUseCase.execute(scanReportId);
      res
        .status(StatusCodes.OK)
        .json(successResponse("Scan report fetched.", data));
    } catch (error) {
      next(error);
    }
  }

  public async getScanReports(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;
      const data = await this._getScanReportsUseCase.execute(userId);
      res
        .status(StatusCodes.OK)
        .json(successResponse("Scan reports fetched.", data));
    } catch (error) {
      next(error);
    }
  }
}

export default ScanReportController;
