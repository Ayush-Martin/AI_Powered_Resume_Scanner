import z from "zod";
import ScanReportEntity, {
  IAnalysisResult,
} from "../../../domain/entities/scanReport.entity";

export class FrowardCreateScanReportDto {
  public userId: number;
  public jobRoleId: number;
  public resumeBuffer: Buffer;
  constructor(userId: number, jobRoleId: number, resumeBuffer: Buffer) {
    this.userId = z.number().int().positive().parse(userId);
    this.jobRoleId = z.number().int().positive().parse(Number(jobRoleId));
    this.resumeBuffer = resumeBuffer;
  }
}

export class ReverseCreateScanReportDto {
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
