export enum TYPES {
  // Repositories
  UserRepository = "UserRepository",
  RefreshTokenRepository = "RefreshTokenRepository",
  JobRoleRepository = "JobRoleRepository",
  ScanReportRepository = "ScanReportRepository",

  // Services
  HashingService = "HashingService",
  JWTService = "JWTService",
  FileStorageService = "FileStorageService",
  LLMService = "LLMService",
  PdfParserService = "PdfParserService",
  PromptService = "PromptService",

  // Use Cases
  RegisterUseCase = "RegisterUseCase",
  LoginUseCase = "LoginUseCase",
  RefreshUseCase = "RefreshUseCase",
  GetJobRolesUseCase = "GetJobRolesUseCase",
  CreateScanReportUseCase = "CreateScanReportUseCase",
  GetScanReportUseCase = "GetScanReportUseCase",
  GetScanReportsUseCase = "GetScanReportsUseCase",
  GetDashboardStatsUseCase = "GetDashboardStatsUseCase",

  // Controllers
  AuthController = "AuthController",
  JobRoleController = "JobRoleController",
  ScanReportController = "ScanReportController",

  // Middlewares
  ErrorHandlerMiddleware = "ErrorHandlerMiddleware",
  UserAuthMiddleware = "UserAuthMiddleware",
  PdfStorageMiddleware = "PdfStorageMiddleware",
}
