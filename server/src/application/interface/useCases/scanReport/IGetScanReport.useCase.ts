
import { ReverseGetScanReportDto } from "../../../DTO/scanReport/getScanReport.dto";

export interface IGetScanReportUseCase {
  execute(scanId: number): Promise<ReverseGetScanReportDto>;
}
