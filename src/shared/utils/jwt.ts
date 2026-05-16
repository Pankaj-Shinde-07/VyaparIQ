import jwt from "jsonwebtoken";
import { config } from "../../config/index.js";

interface JwtPayload {
  userId: string;
  role: string;
}

export const generateTokens = (payload: JwtPayload) => {
  const accessToken = jwt.sign(payload, config.jwt.accessSecret as string, {
    expiresIn: config.jwt.accessExpiresIn as any,
  });

  const refreshToken = jwt.sign(payload, config.jwt.refreshSecret as string, {
    expiresIn: config.jwt.refreshExpiresIn as any,
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.jwt.accessSecret as string) as JwtPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.jwt.refreshSecret as string) as JwtPayload;
};

// synced
