import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { IFileStorageService } from "../interface/services/IFileStorage.service";

@injectable()
class MulterService implements IFileStorageService {
  private upload: multer.Multer;

  constructor() {
    // Switch to memoryStorage
    const storage = multer.memoryStorage();

    this.upload = multer({ 
      storage,
      fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
          cb(null, true);
        } else {
          cb(new Error("Only PDF files are allowed!") as any, false);
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      }
    });
  }

  public getUploadMiddleware(
    fieldName: string
  ): (req: Request, res: Response, next: NextFunction) => void {
    return this.upload.single(fieldName);
  }

  /**
   * Returns the Buffer from memory
   */
  public getPDFBuffer(req: Request): Buffer | null {
    const file = req.file as Express.Multer.File | undefined;
    return file ? file.buffer : null;
  }
}

export default MulterService;