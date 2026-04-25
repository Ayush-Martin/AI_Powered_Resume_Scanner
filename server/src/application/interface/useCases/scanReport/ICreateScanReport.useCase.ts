import {
  FrowardCreateScanReportDto,
  ReverseCreateScanReportDto,
} from "../../../DTO/scanReport/createScanReport.dto";

export interface ICreateScanReportUseCase {
  execute(
    forwardDTO: FrowardCreateScanReportDto,
  ): Promise<ReverseCreateScanReportDto>;
}
