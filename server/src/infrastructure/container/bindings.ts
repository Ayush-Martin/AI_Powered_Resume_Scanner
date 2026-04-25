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
import { IJWTService } from "../interface/services/IJWT.service";
import JWTService from "../services/jwt.service";
import { IRefreshTokenRepository } from "../interface/repositories/IRefreshToken.repository";
import RefreshTokenRepository from "../repositories/refreshToken.repository";
import { ILoginUseCase } from "../../application/interface/useCases/auth/ILogin.useCase";
import LoginUseCase from "../../application/useCases/auth/login.useCase";
import { IRefreshUseCase } from "../../application/interface/useCases/auth/IRefresh.useCase";
import RefreshUseCase from "../../application/useCases/auth/refresh.useCase";
import UserAuthMiddleware from "../../presentation/REST/middlewares/userAuth.middleware";

const container = new Container();

// Repositories
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container
  .bind<IRefreshTokenRepository>(TYPES.RefreshTokenRepository)
  .to(RefreshTokenRepository);

// Services
container.bind<IHashingService>(TYPES.HashingService).to(BcryptService);
container.bind<IJWTService>(TYPES.JWTService).to(JWTService);

// Use Cases
container.bind<IRegisterUseCase>(TYPES.RegisterUseCase).to(RegisterUseCase);
container.bind<ILoginUseCase>(TYPES.LoginUseCase).to(LoginUseCase);
container.bind<IRefreshUseCase>(TYPES.RefreshUseCase).to(RefreshUseCase);

// Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

// Middlewares
container
  .bind<ErrorHandlerMiddleware>(TYPES.ErrorHandlerMiddleware)
  .to(ErrorHandlerMiddleware);
container.bind<UserAuthMiddleware>(TYPES.UserAuthMiddleware).to(UserAuthMiddleware);

export default container;
