import { StatusCodes } from "../constants/statusCodes";
import AppError from "./app.error";

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default NotFoundError;