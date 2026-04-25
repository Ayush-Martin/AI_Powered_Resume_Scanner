import { NextFunction, Request, Response } from "express";
import { binder } from "../../../shared/utils/binder";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { IFileStorageService } from "../../../infrastructure/interface/services/IFileStorage.service";
import ValidationError  from "../../../shared/errors/validation.error";

@injectable()
class PDFStorageMiddleware {
  constructor(
    @inject(TYPES.FileStorageService)
    private _fileStorageService: IFileStorageService,
  ) {
    binder(this);
  }

  /**
   * Middleware to handle single PDF upload for resume scanning
   */
  public execute(req: Request, res: Response, next: NextFunction) {
    // We call the service to get middleware for a single 'resume' field
    const upload = this._fileStorageService.getUploadMiddleware("resume");

    upload(req, res, (err) => {
      if (err) {
        // This catches Multer errors (like wrong file type or file too large)
        return next(err);
      }

      // Extract the single path from the service
      const pdfPath = this._fileStorageService.getPDFPath(req);

      if (!pdfPath) {
        return next(
          new ValidationError("No PDF file uploaded. Please upload a valid resume in PDF format.")
        );
      }

      // Attach the path to the request object for the controller/service to use
      req.resumePath = pdfPath;
      next();
    });
  }
}

export default PDFStorageMiddleware;
