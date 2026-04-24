import App from "./app";
import http from "http";
import "reflect-metadata";

import { envConfig } from "./shared/config/env";
import { connectMysql } from "./infrastructure/database/mysql/connection";

const appInstance = new App();
const server = http.createServer(appInstance.app);

async function init() {
  await connectMysql();
}

init()
  .then(() => {
    server.listen(process.env.PORT || 5000, () => {
      console.info(`✅ [Server] Running on port ${envConfig.PORT}`);
    });
  })
  .catch((err) => {
    console.error(`❌ [Application] [Error] ${err}`);
  });


