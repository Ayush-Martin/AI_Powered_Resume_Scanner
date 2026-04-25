import { en } from "zod/locales";

export enum ServerResponseMessages {
  RUNNING = "Backend server is running",
}

export enum AuthResponseMessages {
  // Error Messages
  EMAIL_ALREADY_EXISTS = "User with email already exists",
  EMAIL_DONT_EXIST = "User with email doesn't exist",
  CREDENTIALS_DONT_MATCH = "Credentials don't match",
  INVALID_ACCESS_TOKEN = "Invalid token",
  USER_NOT_FOUND = "User not found",

  // Success Messages
  REGISTERED = "Registered successfully",
  LOGGED_IN = "Logged in successfully",
  TOKEN_REFRESHED = "Token refreshed successfully",
}

export enum JobRoleResponseMessages {
  // Success Messages
  JOB_ROLES_FETCHED = "Job roles fetched successfully",
}