import { ForwardGetScanReportsDto, ReverseGetScanReportsDto } from "../../../DTO/scanReport/getScanReports.dto";

export interface IGetScanReportsUseCase {
  execute(dto: ForwardGetScanReportsDto): Promise<ReverseGetScanReportsDto>;
}
