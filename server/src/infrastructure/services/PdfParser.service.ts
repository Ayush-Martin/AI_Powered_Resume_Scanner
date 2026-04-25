import * as pdf from "pdf-parse";
import { injectable } from "inversify";
import { IPdfParserService } from "../interface/services/IPdfParser.service";

@injectable()
class PdfParserService implements IPdfParserService {
  /**
   * Concrete implementation using pdf-parse
   */
  public async parse(buffer: Buffer): Promise<string> {
    const data = await (pdf as any)(buffer);

    if (!data.text || data.text.trim().length === 0) {
      throw new Error("PDF contains no extractable text content.");
    }

    return data.text;
  }
}

export default PdfParserService;
