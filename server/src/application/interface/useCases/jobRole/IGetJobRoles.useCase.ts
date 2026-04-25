import { ReverseGetJobRolesDto } from "../../../DTO/jobRole/jobRole.dto";

export interface IGetJobRolesUseCase {
  execute(): Promise<ReverseGetJobRolesDto>;
}
