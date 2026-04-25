/* eslint-disable @typescript-eslint/no-explicit-any */
import appApi from "@/config/axios";
import { ScanReportApiEndPoints } from "@/constants/apiEndPoints";
import type { IResponse } from "@/types/responseType";
import type {
  IPaginatedScanReports,
  IScanReport,
} from "@/types/scanReport.types";
import { toast } from "sonner";

/**
 * Creates a new scan report by uploading a PDF resume with a selected job role.
 * Sends a multipart/form-data request to the server.
 * Returns the created scan report or void on failure.
 */
export const createScanReportService = async (
  jobRoleId: number,
  resumeFile: File,
): Promise<IScanReport | void> => {
  try {
    const formData = new FormData();
    formData.append("jobRoleId", String(jobRoleId));
    formData.append("resume", resumeFile);

    const res: IResponse = await appApi.post(
      ScanReportApiEndPoints.CREATE_SCAN_REPORT,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    return res.data.data as IScanReport;
  } catch (err) {
    const errorMessage =
      (err as any).response?.data?.error ||
      "Failed to analyze resume. Please try again.";
    toast.error(errorMessage);
    console.error(err);
  }
};

/**
 * Fetches a paginated list of scan reports for the authenticated user.
 * Returns the paginated result or void on failure.
 */
export const getScanReportsService = async (
  page: number,
  size: number,
): Promise<IPaginatedScanReports | void> => {
  try {
    const res: IResponse = await appApi.get(
      ScanReportApiEndPoints.GET_SCAN_REPORTS,
      { params: { page, size } },
    );

    return res.data.data as IPaginatedScanReports;
  } catch (err) {
    const errorMessage =
      (err as any).response?.data?.error ||
      "Failed to fetch scan history. Please try again.";
    toast.error(errorMessage);
    console.error(err);
  }
};

/**
 * Fetches a single scan report by its ID.
 * Returns the full scan report or void on failure.
 */
export const getScanReportService = async (
  id: number,
): Promise<IScanReport | void> => {
  try {
    const res: IResponse = await appApi.get(
      `${ScanReportApiEndPoints.GET_SCAN_REPORT}/${id}`,
    );

    return res.data.data as IScanReport;
  } catch (err) {
    const errorMessage =
      (err as any).response?.data?.error ||
      "Failed to fetch scan report. Please try again.";
    toast.error(errorMessage);
    console.error(err);
  }
};

/**
 * Fetches dashboard statistics for the authenticated user.
 * Returns the dashboard stats or void on failure.
 */
export const getDashboardStatsService = async (): Promise<any | void> => {
  try {
    const res: IResponse = await appApi.get(
      ScanReportApiEndPoints.GET_DASHBOARD_STATS,
    );

    return res.data.data;
  } catch (err) {
    const errorMessage =
      (err as any).response?.data?.error ||
      "Failed to fetch dashboard stats. Please try again.";
    toast.error(errorMessage);
    console.error(err);
  }
};
