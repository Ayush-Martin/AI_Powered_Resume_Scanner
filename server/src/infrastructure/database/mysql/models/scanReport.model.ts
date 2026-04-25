import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../connection';

class ScanReport extends Model<InferAttributes<ScanReport>, InferCreationAttributes<ScanReport>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare jobRoleId: number;
  declare matchPercentage: number;
  
  // JSON field for detailed AI breakdown
  declare analysisResult: {
    skillsFound: string[];
    missingSkills: string[];
    summary: string;
  };

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ScanReport.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jobRoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  matchPercentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  analysisResult: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'scan_reports',
});

export default ScanReport;