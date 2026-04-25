class SkillEntity {
  constructor(
    public readonly id: string | number | null,
    public readonly name: string
  ) {}

  public static create(name: string): SkillEntity {
    if (!name || name.trim().length === 0) {
      throw new Error("Skill name cannot be empty");
    }
    return new SkillEntity(null, name);
  }
}

export default SkillEntity;