import { Sequelize } from "sequelize";
import { envConfig } from "../../../shared/config/env";

export const sequelize = new Sequelize(envConfig.MYSQL_URI, {
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectMysql = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("✅ [DB] MySQL connection established successfully.");
  } catch (error) {
    console.error("❌ [DB] Unable to connect to MySQL:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};
