export interface IPdfParserService {
  parse(buffer: Buffer): Promise<string>;
}