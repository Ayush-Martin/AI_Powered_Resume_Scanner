import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { injectable } from "inversify";
import { ILLMService } from "../interface/services/ILLM.service";
import { envConfig } from "../../shared/config/env";

@injectable()
class GeminiService implements ILLMService {
  private _genAI: GoogleGenerativeAI;
  private _model: GenerativeModel;

  constructor() {
    this._genAI = new GoogleGenerativeAI(envConfig.GEMINI_API_KEY);

    this._model = this._genAI.getGenerativeModel({
      model: envConfig.GEMINI_MODEL,
    });
  }

  public async generateResponse(prompt: string): Promise<string> {
    const result = await this._model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  }
}

export default GeminiService;
