import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";

interface RefreshTokenAttributes {
  id: number;
  refreshToken: string;
}

interface RefreshTokenCreationAttributes extends Optional<
  RefreshTokenAttributes,
  "id"
> {}

class RefreshToken
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
  implements RefreshTokenAttributes
{
  declare id: number;
  declare refreshToken: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "refresh_tokens",
    timestamps: true,
  },
);

export default RefreshToken;
