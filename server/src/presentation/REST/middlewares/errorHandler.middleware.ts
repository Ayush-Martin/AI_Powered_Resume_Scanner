import { injectable } from "inversify";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import AppError from "../../../shared/errors/app.error";
import { binder } from "../../../shared/utils/binder";
import { errorResponse } from "../../../shared/utils/responseCreator";

@injectable()
class ErrorHandlerMiddleware {
  constructor() {
    binder(this);
  }

  /**
   * method to handle errors
   * - if error is not zod error, return appropriate status code and message
   * - if error is zod error, return bad request status code and message
   * @param err
   * @param req
   * @param res
   * @param _next
   * @returns
   */
  public handle(
    err: AppError | z.ZodError,
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    console.log(err);

    // 1. Handle non-Zod errors (AppError, etc.)
    if (!(err instanceof z.ZodError)) {
      const status = Number(err.status) || StatusCodes.INTERNAL_SERVER_ERROR;
      res.status(status).json(errorResponse(err.message));
      return;
    }

    // 2. Improve the Zod error message
    // Instead of just messages, we include the field name (path)
    const zodDetails = err.issues
      .map((issue) => {
        const field = issue.path.join(".");
        return `${field ? `[${field}] ` : ""}${issue.message}`;
      })
      .join(" | ");

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse(`Validation Error: ${zodDetails}`));
  }
}

export default ErrorHandlerMiddleware;
