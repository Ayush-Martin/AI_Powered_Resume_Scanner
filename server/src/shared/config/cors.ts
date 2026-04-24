import cors, { CorsOptions } from "cors";
import { envConfig } from "./env";

export const corsOptions: CorsOptions = {
  origin: envConfig.CORS_DOMAIN,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
