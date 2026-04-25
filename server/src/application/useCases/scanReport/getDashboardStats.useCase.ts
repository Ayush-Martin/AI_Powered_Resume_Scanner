import { inject, injectable } from "inversify";
import { IGetDashboardStatsUseCase } from "../../interface/useCases/scanReport/IGetDashboardStats.useCase";
import { ReverseGetDashboardStatsDto } from "../../DTO/scanReport/getDashboardStats.dto";
import { IScanReportRepository } from "../../../infrastructure/interface/repositories/IScanReport.repository";
import { TYPES } from "../../../infrastructure/container/types";

@injectable()
class GetDashboardStatsUseCase implements IGetDashboardStatsUseCase {
  constructor(
    @inject(TYPES.ScanReportRepository)
    private scanReportRepository: IScanReportRepository,
  ) {}

  public async execute(userId: number): Promise<ReverseGetDashboardStatsDto> {
    const totalScans =
      await this.scanReportRepository.getTotalNumberOfScanReports(userId);
    const averageMatchPercentage =
      await this.scanReportRepository.getAverageMatchPercentage(userId);
    const latestScans = await this.scanReportRepository.getUserScanReports(
      userId,
      1,
      3,
    );

    return new ReverseGetDashboardStatsDto(
      totalScans,
      averageMatchPercentage,
      latestScans,
    );
  }
}

export default GetDashboardStatsUseCase;
