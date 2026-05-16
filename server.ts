import "dotenv/config";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { apiRouter } from "./src/routes";
import { errorHandler } from "./src/shared/middlewares/errorHandler";
import { notFoundHandler } from "./src/shared/middlewares/notFound";
import { apiLimiter } from "./src/shared/middlewares/rateLimiter";
import { logger } from "./src/shared/utils/logger";
import { prisma } from "./src/database/client";

// --- Sanity Environment Checks ---
if (process.env.NODE_ENV === "production") {
  if (!process.env.DATABASE_URL)
    logger.warn("DATABASE_URL is missing in production!");
  if (!process.env.JWT_SECRET)
    logger.warn("JWT_SECRET is missing. Proceeding with extreme caution.");
  if (!process.env.SENTRY_DSN)
    logger.warn("SENTRY_DSN is missing. No error tracking configured.");
  if (process.env.CORS_ORIGIN === "*")
    logger.warn(
      "CORS_ORIGIN is set to '*'. This might be unsafe in production.",
    );
}

// Initialize Sentry before app logic
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    environment: process.env.NODE_ENV || "development",
  });
  logger.info("Sentry initialized for error tracking");
}

async function startServer() {
  const app = express();

  // The request handler must be the first middleware on the app
  if (process.env.SENTRY_DSN) {
    Sentry.setupExpressErrorHandler(app);
  }

  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Trust proxy for rate limiter and correct IP detection behind load balancers (Vercel, Railway, Render)
  app.set("trust proxy", 1);

  // Middlewares
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );
  app.use(compression());

  const corsOrigin = process.env.CORS_ORIGIN || "*";
  app.use(
    cors({
      origin: corsOrigin === "*" ? "*" : corsOrigin.split(","),
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Production logging vs dev logging
  app.use(
    morgan((tokens, req, res) => {
      const msg = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");

      if (process.env.NODE_ENV === "production") {
        logger.info("Request Details", {
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: tokens.status(req, res),
          ip: req.ip,
          responseTime: tokens["response-time"](req, res),
        });
        return null; // Morgan logs directly to stdout if string returned, we use logger
      }
      return msg;
    }),
  );

  // Apply general rate limits to all /api routes
  app.use("/api", apiLimiter);

  // Swagger Documentation
  try {
    const swaggerDocument = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "src/docs/swagger.json"),
        "utf8",
      ),
    );
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (error) {
    console.warn("Could not load swagger.json, skipping API docs setup");
  }

  // Support config check
  app.get("/api/support/config", (req, res) => {
    res.json({
      supportEmail: process.env.SUPPORT_EMAIL || "support@vyapariq.com",
      statusUrl: process.env.STATUS_PAGE_URL || "https://status.vyapariq.com",
      phone: process.env.SUPPORT_PHONE || null,
    });
  });

  // Admin Operational Tooling endpoint (Internal)
  app.get("/api/admin/health", async (req, res) => {
    try {
      // Basic count queries to avoid heavy loads
      const [tenantsCount, usersCount, modulesCount] = await Promise.all([
        prisma.business.count(),
        prisma.user.count(),
        prisma.tenantModuleAccess.count(),
      ]);

      res.json({
        status: "ok",
        environment: process.env.NODE_ENV || "development",
        activeUsers: usersCount,
        activeTenants: tenantsCount,
        activeModules: modulesCount,
        uptime: process.uptime(),
      });
    } catch (error: any) {
      logger.error("Admin health check failed", error);
      res.status(500).json({ status: "degraded", error: error.message });
    }
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "VyaparIQ Backend is running" });
  });

  app.use("/api/v1", apiRouter);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Handle unknown API routes (404) BEFORE allowing Vite catch-all
    app.use("/api", notFoundHandler);
  } else {
    // On Vercel, static files are handled by the platform before hitting the function
    if (!process.env.VERCEL) {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));

      // Handle unknown API routes (404) BEFORE returning index.html for SPA
      app.use("/api", notFoundHandler);

      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    } else {
       // In Vercel, if we reach here on an /api route that wasn't found
       app.use("/api", notFoundHandler);
    }
  }

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
}

const appPromise = startServer();

if (process.env.VERCEL) {
  // Instead of app.listen, we export a handler function for Vercel
  module.exports = async (req: any, res: any) => {
    const app = await appPromise;
    app(req, res);
  };
} else {
  appPromise.then((app) => {
    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  }).catch((err) => {
    console.error("Failed to start server:", err);
  });
}

// synced
