/* eslint-disable @typescript-eslint/no-unused-vars */
// express.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      resumePath?: string; // Added for PDF path from Multer middleware
    }
  }
}
