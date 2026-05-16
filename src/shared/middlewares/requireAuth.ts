import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";

/**
 * Authentication Middleware
 * Validates JWT access token and attaches decoded user to the request.
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new AppError(
          "You are not logged in! Please log in to get access.",
          401,
        ),
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    // Attach user to request
    (req as any).user = decoded;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired access token.", 401));
  }
};

// synced
