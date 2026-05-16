import { PrismaClient } from "../generated/prisma/index.js";
import { logger } from "../shared/utils/logger.js";

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

function getDatabaseUrl() {
  let url = process.env.DATABASE_URL;
  if (!url) return undefined;

  try {
    const atIndex = url.lastIndexOf("@");
    if (atIndex !== -1) {
      const protoIndex = url.indexOf("://");
      if (protoIndex !== -1) {
        const protocol = url.substring(0, protoIndex + 3);
        const creds = url.substring(protoIndex + 3, atIndex);
        const rest = url.substring(atIndex);

        const colonIndex = creds.indexOf(":");
        if (colonIndex !== -1) {
          const username = creds.substring(0, colonIndex);
          let password = creds.substring(colonIndex + 1);

          if (password.includes("#")) {
            password = password.replace(/#/g, "%23");
            return protocol + username + ":" + password + rest;
          }
        }
      }
    }
  } catch (e) {
    // ignore
  }

  return url;
}

const isProd = process.env.NODE_ENV === "production";

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl() || process.env.DATABASE_URL,
      },
    },
    log: isProd ? ["warn", "error"] : ["query", "info", "warn", "error"],
  });

if (!isProd) {
  global.prisma = prisma;
}

// synced
