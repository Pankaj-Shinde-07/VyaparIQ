import bcrypt from "bcrypt";
import { prisma } from "../../database/client.js";
import { AppError } from "../../shared/utils/AppError.js";
import { generateTokens } from "../../shared/utils/jwt.js";
import { logger } from "../../shared/utils/logger.js";

export class AuthService {
  static async register(data: any) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      logger.warn("Registration attempt with existing email", {
        email: data.email,
      });
      throw new AppError("Email already in use", 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    logger.info("New user registered", { userId: user.id, email: user.email });
    const tokens = generateTokens({ userId: user.id, role: user.role });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        businessId: user.businessId,
      },
      tokens,
    };
  }

  static async login(data: any) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !user.password) {
      logger.warn("Failed login attempt - User not found", {
        email: data.email,
      });
      throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      logger.warn("Failed login attempt - Invalid password", {
        email: data.email,
      });
      throw new AppError("Invalid email or password", 401);
    }

    logger.debug("User logged in successfully", { userId: user.id });
    const tokens = generateTokens({ userId: user.id, role: user.role });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        businessId: user.businessId,
      },
      tokens,
    };
  }

  static async refresh(token: string) {
    try {
      const { verifyRefreshToken } = require("../../shared/utils/jwt");
      const decoded = verifyRefreshToken(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });
      if (!user) throw new AppError("Invalid refresh token", 401);

      const tokens = generateTokens({ userId: user.id, role: user.role });
      return { tokens };
    } catch (err) {
      logger.warn("Failed token refresh attempt");
      throw new AppError("Invalid or expired refresh token", 401);
    }
  }
}

// synced
