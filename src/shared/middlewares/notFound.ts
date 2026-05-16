import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

/**
 * 404 Not Found Middleware
 * Catch-all handler for invalid API routes.
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};

// synced
