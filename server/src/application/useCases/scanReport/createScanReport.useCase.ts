import { inject, injectable } from "inversify";
import { ICreateScanReportUseCase } from "../../interface/useCases/scanReport/ICreateScanReport.useCase";
import { TYPES } from "../../../infrastructure/container/types";
import { IScanReportRepository } from "../../../infrastructure/interface/repositories/IScanReport.repository";
import { IPdfParserService } from "../../../infrastructure/interface/services/IPdfParser.service";
import {
  FrowardCreateScanReportDto,
  ReverseCreateScanReportDto,
} from "../../DTO/scanReport/createScanReport.dto";
import { IJOBRoleRepository } from "../../../infrastructure/interface/repositories/IJobRole.repository";
import { ILLMService } from "../../../infrastructure/interface/services/ILLM.service";
import { IPromptService } from "../../../domain/interface/service/IPrompt.service";
import NotFoundError from "../../../shared/errors/not-found.error";
import ScanReportEntity from "../../../domain/entities/scanReport.entity";

@injectable()
class CreateScanReportUseCase implements ICreateScanReportUseCase {
  constructor(
    @inject(TYPES.ScanReportRepository)
    private readonly _scanReportRepository: IScanReportRepository,
    @inject(TYPES.PdfParserService)
    private readonly _pdfParserService: IPdfParserService,
    @inject(TYPES.JobRoleRepository)
    private readonly _jobRoleRepository: IJOBRoleRepository,
    @inject(TYPES.LLMService)
    private readonly _llmService: ILLMService,
    @inject(TYPES.PromptService)
    private readonly _promptService: IPromptService,
  ) {}

  public async execute(
    forwardDTO: FrowardCreateScanReportDto,
  ): Promise<ReverseCreateScanReportDto> {
    const { userId, jobRoleId, resumeBuffer } = forwardDTO;

    const resumeText = await this._pdfParserService.parse(resumeBuffer);
    const jobRoleEntity =
      await this._jobRoleRepository.getJobRoleById(jobRoleId);

    if (!jobRoleEntity)
      throw new NotFoundError(`Job Role with id ${jobRoleId} not found.`);

    const prompt = this._promptService.constructAnalysisPrompt(
      jobRoleEntity,
      resumeText,
    );

    const aiResponse = await this._llmService.generateResponse(prompt);

    const { matchPercentage, analysisResult } =
      this._promptService.formatAIResponse(aiResponse);

    const scanReportEntity = new ScanReportEntity(
      userId,
      jobRoleId,
      matchPercentage,
      {
        skillsFound: analysisResult.skillsFound,
        missingSkills: analysisResult.missingSkills,
        summary: analysisResult.summary,
      },
    );

    const createdReport =
      await this._scanReportRepository.create(scanReportEntity);

    return new ReverseCreateScanReportDto(createdReport);
  }
}

export default CreateScanReportUseCase;
