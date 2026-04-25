
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { ForwardRegisterDTO } from "../../../application/DTO/auth/register.dto";
import { IRegisterUseCase } from "../../../application/interface/useCases/auth/IRegister.useCase";
import { TYPES } from "../../../infrastructure/container/types";
import { AuthResponseMessages } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { binder } from "../../../shared/utils/binder";
import { successResponse } from "../../../shared/utils/responseCreator";

@injectable()
class AuthController {
  constructor(
    @inject(TYPES.RegisterUseCase)
    private readonly _registerUseCase: IRegisterUseCase,
  ) {
    binder(this);
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const forwardRegisterDTO = new ForwardRegisterDTO(req.body);

      const response = await this._registerUseCase.execute(forwardRegisterDTO);

      res
        .status(StatusCodes.CREATED)
        .json(successResponse(AuthResponseMessages.REGISTERED));
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
