import { StatusCodes } from "../constants/statusCodes";
import AppError from "./app.error";

class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default UnauthorizedError;