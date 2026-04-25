import AuthController from "../../presentation/REST/controllers/auth.controller";
import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";
import container from "./bindings";
import { TYPES } from "./types";


// Controllers
export const authController = container.get<AuthController>(
  TYPES.AuthController,
);

// Middlewares
export const errorHandlerMiddleware = container.get<ErrorHandlerMiddleware>(
  TYPES.ErrorHandlerMiddleware,
);
