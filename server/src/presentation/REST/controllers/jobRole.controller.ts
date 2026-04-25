import { Request, Response, NextFunction } from "express";
import { binder } from "../../../shared/utils/binder";
import { TYPES } from "../../../infrastructure/container/types";
import GetJobRolesUseCase from "../../../application/useCases/jobRole/getJobRoles.useCase";
import { inject } from "inversify";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { successResponse } from "../../../shared/utils/responseCreator";
import { JobRoleResponseMessages } from "../../../shared/constants/responseMessages";

class JobRoleController {
  constructor(
    @inject(TYPES.GetJobRolesUseCase)
    private getJobRolesUseCase: GetJobRolesUseCase,
  ) {
    binder(this);
  }

  public async getJobRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = await this.getJobRolesUseCase.execute();
      res
        .status(StatusCodes.OK)
        .json(successResponse(JobRoleResponseMessages.JOB_ROLES_FETCHED, dto));
    } catch (error) {
      next(error);
    }
  }
}

export default JobRoleController;
