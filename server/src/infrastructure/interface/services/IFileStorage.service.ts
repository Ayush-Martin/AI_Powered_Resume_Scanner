import { NextFunction, Request, Response } from "express";

export interface IFileStorageService {
  getUploadMiddleware(
    fieldName: string,
  ): (req: Request, res: Response, next: NextFunction) => void;
  getPDFPath(req: Request): string | null;
}
