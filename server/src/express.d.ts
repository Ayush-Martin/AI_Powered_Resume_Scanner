/* eslint-disable @typescript-eslint/no-unused-vars */
// express.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      resumeBuffer?: Buffer; // Added for PDF buffer from Multer middleware
    }
  }
}
