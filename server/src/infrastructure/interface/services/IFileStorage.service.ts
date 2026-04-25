import { NextFunction, Request, Response } from "express";

export interface IFileStorageService {
  getUploadMiddleware(
    fieldName: string,
  ): (req: Request, res: Response, next: NextFunction) => void;
  // Now returns a Buffer for memory storage
  getPDFBuffer(req: Request): Buffer | null;
}