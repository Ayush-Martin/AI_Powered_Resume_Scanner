import multer from "multer";
import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { IFileStorageService } from "../interface/services/IFileStorage.service";

@injectable()
class MulterService implements IFileStorageService {
  private upload: multer.Multer;

  constructor() {
    const storage = this.getStorage();
    this.upload = multer({ 
      storage,
      // Added file filter to validate PDF format
      fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
          cb(null, true);
        } else {
          cb(new Error("Only PDF files are allowed!"));
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // Optional: limit size to 5MB
      }
    });
  }

  private getStorage() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        // Ensure this path matches your project structure
        const dir = path.join(__dirname, "../../../uploads");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
        cb(null, `${name}-${Date.now()}${ext}`);
      },
    });
  }

  /**
   * Updated to handle exactly one file
   */
  public getUploadMiddleware(
    fieldName: string
  ): (req: Request, res: Response, next: NextFunction) => void {
    // Changed from .array() to .single()
    return this.upload.single(fieldName);
  }

  /**
   * Updated to return a single path string instead of an array
   */
  public getPDFPath(req: Request): string | null {
    const file = req.file as Express.Multer.File | undefined;
    return file ? file.path : null;
  }
}

export default MulterService;