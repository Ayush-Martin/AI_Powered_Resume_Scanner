import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { IJOBRoleRepository } from "../../../infrastructure/interface/repositories/IJobRole.repository";
import { IGetJobRolesUseCase } from "../../interface/useCases/jobRole/IGetJobRoles.useCase";
import { ReverseGetJobRolesDto } from "../../DTO/jobRole/jobRole.dto";

@injectable()
class GetJobRolesUseCase implements IGetJobRolesUseCase {
  constructor(
    @inject(TYPES.JobRoleRepository)
    private readonly _jobRoleRepository: IJOBRoleRepository,
  ) {}

  public async execute(): Promise<ReverseGetJobRolesDto> {
    const jobRoleEntities = await this._jobRoleRepository.getAllJobRoles();
    return new ReverseGetJobRolesDto(jobRoleEntities);
  }
}

export default GetJobRolesUseCase;
