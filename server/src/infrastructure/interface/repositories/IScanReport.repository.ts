import ScanReportEntity from "../../../domain/entities/scanReport.entity";

export interface IScanReportRepository {
  create(entity: ScanReportEntity): Promise<ScanReportEntity>;
  findById(id: number): Promise<ScanReportEntity | null>;
  getUserScanReports(userId: number): Promise<ScanReportEntity[]>;
  delete(id: number): Promise<void>;
}