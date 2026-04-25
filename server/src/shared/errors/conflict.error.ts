import { StatusCodes } from "../constants/statusCodes";
import AppError from "./app.error";

class ConflictError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);
  }
}

export default ConflictError;