import { inject, injectable } from "inversify";
import { IGetScanReportsUseCase } from "../../interface/useCases/scanReport/IGetScanReports.useCase";
import {
  ForwardGetScanReportsDto,
  ReverseGetScanReportsDto,
} from "../../DTO/scanReport/getScanReports.dto";
import { IScanReportRepository } from "../../../infrastructure/interface/repositories/IScanReport.repository";
import { TYPES } from "../../../infrastructure/container/types";

@injectable()
class GetScanReportsUseCase implements IGetScanReportsUseCase {
  constructor(
    @inject(TYPES.ScanReportRepository)
    private scanReportRepository: IScanReportRepository,
  ) {}

  public async execute(
    dto: ForwardGetScanReportsDto,
  ): Promise<ReverseGetScanReportsDto> {
    const scanReports = await this.scanReportRepository.getUserScanReports(
      dto.userId,
      dto.page,
      dto.size,
    );

    const noOfPages = Math.ceil(
      (await this.scanReportRepository.getTotalNumberOfScanReports(
        dto.userId,
      )) / dto.size,
    );

    return new ReverseGetScanReportsDto(scanReports, dto.page, noOfPages);
  }
}

export default GetScanReportsUseCase;
