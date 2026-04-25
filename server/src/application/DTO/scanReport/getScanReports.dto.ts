import ScanReportEntity from "../../../domain/entities/scanReport.entity";

export class ReverseGetScanReportsDto {
  public scanReports: Array<{
    id: number;
    matchPercentage: number;
    createdAt: Date;
  }>;

  constructor(entities: ScanReportEntity[]) {
    this.scanReports = entities.map((entity) => ({
      id: entity.id as number,
      matchPercentage: entity.matchPercentage,
      createdAt: entity.createdAt as Date,
    }));
  }
}
