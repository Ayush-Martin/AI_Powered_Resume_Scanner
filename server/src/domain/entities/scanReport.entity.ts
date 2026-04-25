export interface IAnalysisResult {
  skillsFound: string[];
  missingSkills: string[];
  summary: string;
}

class ScanReportEntity {
  constructor(
    public readonly userId: number,
    public readonly jobRoleId: number,
    public readonly matchPercentage: number,
    public readonly analysisResult: IAnalysisResult,
    public readonly id?: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}

export default ScanReportEntity;
