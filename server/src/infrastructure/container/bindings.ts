import { Container } from "inversify";
import { TYPES } from "./types";
import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";


const container = new Container();

// Repositories

// Services

// Use Cases

// Controllers

// Middlewares
container
  .bind<ErrorHandlerMiddleware>(TYPES.ErrorHandlerMiddleware)
  .to(ErrorHandlerMiddleware);


export default container;
