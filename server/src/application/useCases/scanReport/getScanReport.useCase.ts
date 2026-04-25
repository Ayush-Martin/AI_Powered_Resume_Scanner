import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { IScanReportRepository } from "../../../infrastructure/interface/repositories/IScanReport.repository";
import NotFoundError from "../../../shared/errors/not-found.error";
import { IGetScanReportUseCase } from "../../interface/useCases/scanReport/IGetScanReport.useCase";
import { ReverseGetScanReportDto } from "../../DTO/scanReport/getScanReport.dto";

@injectable()
class GetScanReportUseCase implements IGetScanReportUseCase {
  constructor(
    @inject(TYPES.ScanReportRepository)
    private readonly _scanReportRepository: IScanReportRepository,
  ) {}

  public async execute(scanId: number): Promise<ReverseGetScanReportDto> {
    const scanReport = await this._scanReportRepository.findById(scanId);
    if (!scanReport)
      throw new NotFoundError(`Scan report with id ${scanId} not found`);
    return new ReverseGetScanReportDto(scanReport);
  }
}

export default GetScanReportUseCase;
