import ScanReportEntity from "../../../domain/entities/scanReport.entity";

export class ReverseGetDashboardStatsDto {
  public totalScans: number;
  public averageMatchPercentage: number;
  public latestScans: Omit<ScanReportEntity, "userId" | "updatedAt">[];

  constructor(
    totalScans: number,
    averageMatchPercentage: number,
    latestScans: ScanReportEntity[],
  ) {
    this.totalScans = totalScans;
    this.averageMatchPercentage = averageMatchPercentage;
    this.latestScans = latestScans.map((scan) => {
      const { userId, updatedAt, ...rest } = scan;
      return rest;
    });
  }
}
