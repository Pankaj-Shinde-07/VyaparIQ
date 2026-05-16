import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "super_secret_access_key",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "super_secret_refresh_key",
    accessExpiresIn: "15m",
    refreshExpiresIn: "7d",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
  },
};

// synced
