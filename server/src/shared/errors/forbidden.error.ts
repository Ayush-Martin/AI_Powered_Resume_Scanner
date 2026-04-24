import { StatusCodes } from "../constants/statusCodes";
import AppError from "./app.error";

class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

export default ForbiddenError;