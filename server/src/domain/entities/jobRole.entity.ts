import SkillEntity from "./skill.entity";

class JobRoleEntity {
  constructor(
    public readonly id: string | number | null,
    public readonly title: string,
    public readonly skills: SkillEntity[] = [],
  ) {}
}

export default JobRoleEntity;
