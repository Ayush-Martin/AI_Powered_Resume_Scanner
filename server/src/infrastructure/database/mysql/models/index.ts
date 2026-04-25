import JobRole from "./jobRole.model";
import Skill from "./skill.model";
import JobRoleSkill from "./jobRoleSkill.model";
import User from "./user.model";
import RefreshToken from "./refreshToken.model";
import ScanReport from "./scanReport.model";


JobRole.belongsToMany(Skill, { through: JobRoleSkill, foreignKey: 'jobRoleId' });
Skill.belongsToMany(JobRole, { through: JobRoleSkill, foreignKey: 'skillId' });

User.hasMany(RefreshToken, { foreignKey: 'userId' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

export {
  User,
  RefreshToken,
  JobRole,
  Skill,
  JobRoleSkill,
  ScanReport,
};