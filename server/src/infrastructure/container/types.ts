export enum TYPES {
  // Repositories
  UserRepository = "UserRepository",
  RefreshTokenRepository = "RefreshTokenRepository",
  JobRoleRepository = "JobRoleRepository",

  // Services
  HashingService = "HashingService",
  JWTService = "JWTService",
  FileStorageService = "FileStorageService",
  LLMService = "LLMService",

  // Use Cases
  RegisterUseCase = "RegisterUseCase",
  LoginUseCase = "LoginUseCase",
  RefreshUseCase = "RefreshUseCase",
  GetJobRolesUseCase = "GetJobRolesUseCase",
  
  // Controllers
  AuthController = "AuthController",
  JobRoleController = "JobRoleController",
  
  // Middlewares
  ErrorHandlerMiddleware = "ErrorHandlerMiddleware",
  UserAuthMiddleware = "UserAuthMiddleware",
}
