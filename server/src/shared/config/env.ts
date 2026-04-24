import { config } from "dotenv";

config();
export const envConfig = {
  PORT: process.env.PORT || 5000,
  CORS_DOMAIN: process.env.CORS_DOMAIN || ["http://localhost:5173"],
  NODE_ENV: process.env.NODE_ENV || "development",
  MYSQL_URI: process.env.MYSQL_URI!,
  PASSWORD_SALT_ROUNDS: process.env.PASSWORD_SALT_ROUNDS || 10,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  ACCESS_TOKEN_EXPIRY_MIN: process.env.ACCESS_TOKEN_EXPIRY_MIN || 15,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
  REFRESH_TOKEN_EXPIRY_DAY: process.env.REFRESH_TOKEN_EXPIRY_DAY || 30,
} as const;