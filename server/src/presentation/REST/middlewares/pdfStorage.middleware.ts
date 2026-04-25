import { NextFunction, Request, Response } from "express";
import { binder } from "../../../shared/utils/binder";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { IFileStorageService } from "../../../infrastructure/interface/services/IFileStorage.service";
import ValidationError from "../../../shared/errors/validation.error";

@injectable()
class PDFStorageMiddleware {
  constructor(
    @inject(TYPES.FileStorageService)
    private _fileStorageService: IFileStorageService,
  ) {
    binder(this);
  }

  public execute(req: Request, res: Response, next: NextFunction) {
    const upload = this._fileStorageService.getUploadMiddleware("resume");

    upload(req, res, (err) => {
      if (err) {
        return next(err);
      }

      // Get buffer instead of path
      const pdfBuffer = this._fileStorageService.getPDFBuffer(req);

      if (!pdfBuffer) {
        return next(
          new ValidationError("No PDF file uploaded. Please upload a valid resume in PDF format.")
        );
      }

      // Attach the buffer to the request
      req.resumeBuffer = pdfBuffer;
      next();
    });
  }
}

export default PDFStorageMiddleware;