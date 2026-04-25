import { ReverseGetDashboardStatsDto } from "../../DTO/scanReport/getDashboardStats.dto";

export interface IGetDashboardStatsUseCase {
  execute(userId: number): Promise<ReverseGetDashboardStatsDto>;
}
