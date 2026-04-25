import z from "zod";
import ScanReportEntity from "../../../domain/entities/scanReport.entity";
import PaginationValidationRule from "../../../shared/validation/validationRules/paginationValidationRules";

export class ForwardGetScanReportsDto {
  public userId: number;
  public page: number;
  public size: number;

  constructor(data: any) {
    const schema = z.object({
      userId: z.number().int().positive(),
      page: PaginationValidationRule.page,
      size: PaginationValidationRule.size,
    });

    const validatedData = schema.parse(data);

    this.userId = validatedData.userId;
    this.page = validatedData.page;
    this.size = validatedData.size;
  }
}

export class ReverseGetScanReportsDto {
  public scanReports: Array<{
    id: number;
    matchPercentage: number;
    jobRoleTitle?: string;
    createdAt: Date;
  }>;
  public page: number;
  public noOfPages: number;

  constructor(entities: ScanReportEntity[], page: number, noOfPages: number) {
    this.scanReports = entities.map((entity) => ({
      id: entity.id as number,
      matchPercentage: entity.matchPercentage,
      jobRoleTitle: entity.jobRoleTitle,
      createdAt: entity.createdAt as Date,
    }));
    this.page = page;
    this.noOfPages = noOfPages;
  }
}
