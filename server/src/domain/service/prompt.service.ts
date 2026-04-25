import { injectable } from "inversify";
import { IPromptService } from "../interface/service/IPrompt.service";
import { JobRole } from "../../infrastructure/database/mysql/models";
import { IAnalysisResult } from "../entities/scanReport.entity";
import JobRoleEntity from "../entities/jobRole.entity";

@injectable()
class PromptService implements IPromptService {
  public constructAnalysisPrompt(
    jobRole: JobRoleEntity,
    resumeText: string,
  ): string {
    // Transform objects into a comma-separated string
    const skills = jobRole.skills.map((s) => s.name).join(", ");

    return `
      You are an expert HR Technical Recruiter. 
      Analyze the following Resume Text against the Required Skills for the role of "${jobRole.title}".
      
      Required Skills: ${skills}
      
      Resume Text: ${resumeText}
      
      Provide a evaluation in STATED JSON format:
      {
        "matchPercentage": number,
        "skillsFound": string[],
        "missingSkills": string[],
        "summary": string
      }
    `;
  }

  public formatAIResponse(rawResponse: string): {
    matchPercentage: number;
    analysisResult: IAnalysisResult;
  } {
    try {
      // Clean the response (Gemini sometimes adds markdown backticks)
      const cleanJson = rawResponse.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      return {
        matchPercentage: parsed.matchPercentage || 0,
        analysisResult: {
          skillsFound: parsed.skillsFound || [],
          missingSkills: parsed.missingSkills || [],
          summary: parsed.summary || "No summary provided.",
        },
      };
    } catch (error) {
      throw new Error(
        "AI returned an invalid format. Failed to structure the report.",
      );
    }
  }
}

export default PromptService;
