import JobRoleEntity from "../../../domain/entities/jobRole.entity";

export interface IJOBRoleRepository {
  getAllJobRoles(): Promise<JobRoleEntity[]>;
  getJobRoleById(id: number): Promise<JobRoleEntity | null>;
}
