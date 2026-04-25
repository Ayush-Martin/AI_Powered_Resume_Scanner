import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connection";

interface SkillAttributes {
  id: number;
  name: string;
}

class Skill extends Model<SkillAttributes> implements SkillAttributes {
  declare id: number;
  declare name: string;
}

Skill.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { sequelize, tableName: "skills", timestamps: false });

export default Skill;