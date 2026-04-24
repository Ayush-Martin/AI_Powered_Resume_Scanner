import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";
import container from "./bindings";
import { TYPES } from "./types";

// Controllers

// Middlewares
export const errorHandlerMiddleware = container.get<ErrorHandlerMiddleware>(
  TYPES.ErrorHandlerMiddleware,
);
