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
import { IJOBRoleRepository } from "../interface/repositories/IJobRole.repository";
import JobRoleRepository from "../repositories/jobRole.repository";
import { IGetJobRolesUseCase } from "../../application/interface/useCases/jobRole/IGetJobRoles.useCase";
import GetJobRolesUseCase from "../../application/useCases/jobRole/getJobRoles.useCase";
import JobRoleController from "../../presentation/REST/controllers/jobRole.controller";
import MulterService from "../services/Multer.service";
import { IFileStorageService } from "../interface/services/IFileStorage.service";
import GeminiService from "../services/gemini.service";
import { ILLMService } from "../interface/services/ILLM.service";

const container = new Container();

// Repositories
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container
  .bind<IRefreshTokenRepository>(TYPES.RefreshTokenRepository)
  .to(RefreshTokenRepository);
container.bind<IJOBRoleRepository>(TYPES.JobRoleRepository).to(JobRoleRepository);

// Services
container.bind<IHashingService>(TYPES.HashingService).to(BcryptService);
container.bind<IJWTService>(TYPES.JWTService).to(JWTService);
container.bind<IFileStorageService>(TYPES.FileStorageService).to(MulterService);
container.bind<ILLMService>(TYPES.LLMService).to(GeminiService);

// Use Cases
container.bind<IRegisterUseCase>(TYPES.RegisterUseCase).to(RegisterUseCase);
container.bind<ILoginUseCase>(TYPES.LoginUseCase).to(LoginUseCase);
container.bind<IRefreshUseCase>(TYPES.RefreshUseCase).to(RefreshUseCase);
container.bind<IGetJobRolesUseCase>(TYPES.GetJobRolesUseCase).to(GetJobRolesUseCase);

// Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<JobRoleController>(TYPES.JobRoleController).to(JobRoleController);
// Middlewares
container
  .bind<ErrorHandlerMiddleware>(TYPES.ErrorHandlerMiddleware)
  .to(ErrorHandlerMiddleware);
container.bind<UserAuthMiddleware>(TYPES.UserAuthMiddleware).to(UserAuthMiddleware);

export default container;
