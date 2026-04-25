import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connection";

class JobRoleSkill extends Model {}

JobRoleSkill.init({
  jobRoleId: {
    type: DataTypes.INTEGER,
    references: { model: 'job_roles', key: 'id' },
    primaryKey: true
  },
  skillId: {
    type: DataTypes.INTEGER,
    references: { model: 'skills', key: 'id' },
    primaryKey: true
  }
}, { sequelize, tableName: "job_role_skills", timestamps: false });

export default JobRoleSkill;