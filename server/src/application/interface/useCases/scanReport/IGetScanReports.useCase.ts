import { ReverseGetScanReportsDto } from "../../../DTO/scanReport/getScanReports.dto";

export interface IGetScanReportsUseCase {
  execute(userId: number): Promise<ReverseGetScanReportsDto>;
}
