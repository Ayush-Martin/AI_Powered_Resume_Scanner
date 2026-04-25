import JobRoleEntity from "../../../domain/entities/jobRole.entity";

export class ReverseGetJobRolesDto {
  public jobRoles: Array<{
    id: string | number | null;
    title: string;
  }>;
  constructor(jobRoles: JobRoleEntity[]) {
    this.jobRoles = jobRoles.map((jobRole) => ({
      id: jobRole.id,
      title: jobRole.title,
    }));
  }
}