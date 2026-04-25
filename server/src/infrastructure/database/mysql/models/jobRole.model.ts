import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "../connection";
import Skill from "./skill.model";

interface JobRoleAttributes {
  id: number;
  title: string;
}

class JobRole extends Model<JobRoleAttributes> implements JobRoleAttributes {
  declare id: number;
  declare title: string;

  declare Skills?: NonAttribute<Skill[]>;
}

JobRole.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { sequelize, tableName: "job_roles", timestamps: false });

export default JobRole;