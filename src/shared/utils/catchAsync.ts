import { Request, Response, NextFunction } from "express";

/**
 * Wraps async express route handlers to catch promise errors.
 */
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// synced
