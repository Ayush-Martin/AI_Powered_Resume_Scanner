import { JobRole } from "../../../infrastructure/database/mysql/models";
import JobRoleEntity from "../../entities/jobRole.entity";
import { IAnalysisResult } from "../../entities/scanReport.entity";

export interface IPromptService {
  constructAnalysisPrompt(jobRole: JobRoleEntity, resumeText: string): string;
  formatAIResponse(rawResponse: string): {
    matchPercentage: number;
    analysisResult: IAnalysisResult;
  };
}
