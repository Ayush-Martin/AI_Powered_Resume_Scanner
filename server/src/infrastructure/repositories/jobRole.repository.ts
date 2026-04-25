import { injectable } from "inversify";
import { IJOBRoleRepository } from "../interface/repositories/IJobRole.repository";
import { JobRole, Skill } from "../database/mysql/models";
import JobRoleEntity from "../../domain/entities/jobRole.entity";
import SkillEntity from "../../domain/entities/skill.entity";

@injectable()
class JobRoleRepository implements IJOBRoleRepository {
  
  /**
   * MAPPER: SQL Model -> Domain Entity
   */
  private _toEntity(row: JobRole): JobRoleEntity {
    const skills = row.Skills 
      ? row.Skills.map((s: any) => new SkillEntity(s.id, s.name)) 
      : [];

    return new JobRoleEntity(
      row.id, 
      row.title, 
      skills
    );
  }

  /**
   * LIGHTWEIGHT: Used for dropdowns/lists
   */
  async getAllJobRoles(): Promise<JobRoleEntity[]> {
    const jobRoles = await JobRole.findAll({
      attributes: ['id', 'title'] 
    });
    
    return jobRoles.map(role => this._toEntity(role));
  }

  /**
   * DETAILED: Used for the scanner logic
   */
  async getJobRoleById(id: number): Promise<JobRoleEntity | null> {
    const jobRole = await JobRole.findByPk(id, {
      include: [{
        model: Skill,
        through: { attributes: [] } // Exclude the join table metadata
      }]
    });
    
    return jobRole ? this._toEntity(jobRole) : null;
  }
}

export default JobRoleRepository;