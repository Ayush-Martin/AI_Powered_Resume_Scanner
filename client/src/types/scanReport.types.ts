export interface IAnalysisResult {
  skillsFound: string[];
  missingSkills: string[];
  summary: string;
}

export interface IScanReportListItem {
  id: number;
  matchPercentage: number;
  createdAt: Date;
}

export interface IScanReport {
  id: number;
  userId: number;
  jobRoleId: number;
  matchPercentage: number;
  analysisResult: IAnalysisResult;
  createdAt: Date;
}

export interface IJobRole {
  id: number;
  title: string;
}

export interface IPaginatedScanReports {
  scanReports: IScanReportListItem[];
  page: number;
  noOfPages: number;
}
