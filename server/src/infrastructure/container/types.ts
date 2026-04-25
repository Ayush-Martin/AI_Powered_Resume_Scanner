export enum TYPES {
  // Repositories
  UserRepository = "UserRepository",
  RefreshTokenRepository = "RefreshTokenRepository",

  // Services
  HashingService = "HashingService",
  JWTService = "JWTService",

  // Use Cases
  RegisterUseCase = "RegisterUseCase",
  LoginUseCase = "LoginUseCase",
  RefreshUseCase = "RefreshUseCase",

  // Controllers
  AuthController = "AuthController",

  // Middlewares
  ErrorHandlerMiddleware = "ErrorHandlerMiddleware",
  UserAuthMiddleware = "UserAuthMiddleware",
}
