import { inject, injectable } from "inversify";
import { IGetScanReportsUseCase } from "../../interface/useCases/scanReport/IGetScanReports.useCase";
import { ReverseGetScanReportsDto } from "../../DTO/scanReport/getScanReports.dto";
import { IScanReportRepository } from "../../../infrastructure/interface/repositories/IScanReport.repository";
import { TYPES } from "../../../infrastructure/container/types";

@injectable()
class GetScanReportsUseCase implements IGetScanReportsUseCase {
  constructor(
    @inject(TYPES.ScanReportRepository)
    private scanReportRepository: IScanReportRepository,
  ) {}

  public async execute(userId: number): Promise<ReverseGetScanReportsDto> {
    const scanReports =
      await this.scanReportRepository.getUserScanReports(userId);
    return new ReverseGetScanReportsDto(scanReports);
  }
}

export default GetScanReportsUseCase;
