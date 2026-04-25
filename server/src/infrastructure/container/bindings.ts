import { Container } from "inversify";
import { IRegisterUseCase } from "../../application/interface/useCases/auth/IRegister.useCase";
import RegisterUseCase from "../../application/useCases/auth/register.useCase";
import AuthController from "../../presentation/REST/controllers/auth.controller";
import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";
import { IUserRepository } from "../interface/repositories/IUser.repository";
import { IHashingService } from "../interface/services/IHashing.service";
import UserRepository from "../repositories/user.repository";
import BcryptService from "../services/Bcrypt.service";
import { TYPES } from "./types";


const container = new Container();

// Repositories
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

// Services
container.bind<IHashingService>(TYPES.HashingService).to(BcryptService);

// Use Cases
container.bind<IRegisterUseCase>(TYPES.RegisterUseCase).to(RegisterUseCase);

// Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

// Middlewares
container
  .bind<ErrorHandlerMiddleware>(TYPES.ErrorHandlerMiddleware)
  .to(ErrorHandlerMiddleware);

export default container;
