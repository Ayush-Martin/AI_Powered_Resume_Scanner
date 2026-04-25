/* eslint-disable @typescript-eslint/no-explicit-any */
import appApi from "@/config/axios";
import { JobRoleApiEndPoints } from "@/constants/apiEndPoints";
import type { IResponse } from "@/types/responseType";
import type { IJobRole } from "@/types/scanReport.types";
import { toast } from "sonner";

/**
 * Fetches all available job roles from the server.
 * Returns an array of job roles or void on failure.
 */
export const getJobRolesService = async (): Promise<IJobRole[] | void> => {
  try {
    const res: IResponse = await appApi.get(JobRoleApiEndPoints.GET_JOB_ROLES);
    return res.data.data.jobRoles as IJobRole[];
  } catch (err) {
    const errorMessage =
      (err as any).response?.data?.error ||
      "Failed to fetch job roles. Please try again.";
    toast.error(errorMessage);
    console.error(err);
  }
};
