import { Router } from "express";
import { jobRoleController } from "../../../infrastructure/container/DI";

const jobRoleRouter = Router();

jobRoleRouter.get("/", jobRoleController.getJobRoles);

export default jobRoleRouter;
