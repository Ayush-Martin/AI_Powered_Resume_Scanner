import AuthController from "../../presentation/REST/controllers/auth.controller";
import JobRoleController from "../../presentation/REST/controllers/jobRole.controller";
import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";
import UserAuthMiddleware from "../../presentation/REST/middlewares/userAuth.middleware";
import container from "./bindings";
import { TYPES } from "./types";


// Controllers
export const authController = container.get<AuthController>(
  TYPES.AuthController,
);
export const jobRoleController = container.get<JobRoleController>(
  TYPES.JobRoleController,
);

// Middlewares
export const errorHandlerMiddleware = container.get<ErrorHandlerMiddleware>(
  TYPES.ErrorHandlerMiddleware,
);

export const userAuthMiddleware = container.get<UserAuthMiddleware>(
  TYPES.UserAuthMiddleware,
);
