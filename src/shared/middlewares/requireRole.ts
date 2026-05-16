import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

type Role = "SUPER_ADMIN" | "BUSINESS_OWNER" | "MANAGER" | "STAFF";

export const requireRoles = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role;

    if (!userRole || !roles.includes(userRole)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }

    next();
  };
};

// synced
