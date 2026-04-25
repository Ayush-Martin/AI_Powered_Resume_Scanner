import ScanReportEntity from "../../../domain/entities/scanReport.entity";

export interface IScanReportRepository {
  create(entity: ScanReportEntity): Promise<ScanReportEntity>;
  findById(id: number): Promise<ScanReportEntity | null>;
  getUserScanReports(userId: number, page: number, size: number): Promise<ScanReportEntity[]>;
  getTotalNumberOfScanReports(userId: number): Promise<number>;
  getAverageMatchPercentage(userId: number): Promise<number>;
  delete(id: number): Promise<void>;
}
