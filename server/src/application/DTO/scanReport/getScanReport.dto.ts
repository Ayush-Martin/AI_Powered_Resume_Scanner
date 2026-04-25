import ScanReportEntity, {
  IAnalysisResult,
} from "../../../domain/entities/scanReport.entity";

export class ReverseGetScanReportDto {
  public id: number;
  public userId: number;
  public jobRoleId: number;
  public matchPercentage: number;
  public analysisResult: IAnalysisResult;
  public jobRoleTitle?: string;
  public createdAt: Date;

  constructor(entity: ScanReportEntity) {
    this.id = entity.id as number;
    this.userId = entity.userId;
    this.jobRoleId = entity.jobRoleId;
    this.matchPercentage = entity.matchPercentage;
    this.analysisResult = entity.analysisResult;
    this.jobRoleTitle = entity.jobRoleTitle;
    this.createdAt = entity.createdAt as Date;
  }
}
