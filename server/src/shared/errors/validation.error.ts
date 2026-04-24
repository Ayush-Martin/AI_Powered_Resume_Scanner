import { StatusCodes } from "../constants/statusCodes";
import AppError from "./app.error";

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export default ValidationError;