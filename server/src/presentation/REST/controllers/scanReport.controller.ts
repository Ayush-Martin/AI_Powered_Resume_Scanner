import { Request, Response, NextFunction } from "express";
import { binder } from "../../../shared/utils/binder";
import { inject } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { ICreateScanReportUseCase } from "../../../application/interface/useCases/scanReport/ICreateScanReport.useCase";
import { FrowardCreateScanReportDto } from "../../../application/DTO/scanReport/createScanReport.dto";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { successResponse } from "../../../shared/utils/responseCreator";

class ScanReportController {
  constructor(
    @inject(TYPES.CreateScanReportUseCase)
    private readonly _createScanReportUseCase: ICreateScanReportUseCase,
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
}

export default ScanReportController;
