import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { prisma } from "../../database/client.js";
import { UserService } from "../../core/users/users.service.js";

export const requireModuleAccess = (moduleCode: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        return next(new AppError("User not authenticated", 401));
      }

      const user = await UserService.getUserById(userId);
      if (!user.businessId) {
        return next(
          new AppError("User is not associated with a business", 403),
        );
      }

      // Bypass for SUPER_ADMIN if needed, but here we require strict access

      const access = await prisma.tenantModuleAccess.findFirst({
        where: {
          businessId: user.businessId,
          module: {
            code: moduleCode,
          },
          isActive: true,
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        },
      });

      if (!access) {
        return next(
          new AppError(
            `Your business does not have access to the ${moduleCode} module. Please subscribe.`,
            403,
          ),
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// synced
