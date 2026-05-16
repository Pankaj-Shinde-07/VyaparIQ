import * as Sentry from "@sentry/node";

const isProduction = process.env.NODE_ENV === "production";

export const logger = {
  info: (message: string, meta?: any) => {
    console.log(
      JSON.stringify({
        level: "info",
        message,
        ...meta,
        timestamp: new Date().toISOString(),
      }),
    );
  },
  warn: (message: string, meta?: any) => {
    console.warn(
      JSON.stringify({
        level: "warn",
        message,
        ...meta,
        timestamp: new Date().toISOString(),
      }),
    );
    if (isProduction && process.env.SENTRY_DSN) {
      Sentry.captureMessage(message, "warning");
    }
  },
  error: (message: string, error?: any, meta?: any) => {
    console.error(
      JSON.stringify({
        level: "error",
        message,
        error: error?.message || error,
        ...meta,
        timestamp: new Date().toISOString(),
      }),
    );
    if (isProduction && process.env.SENTRY_DSN) {
      if (error instanceof Error) {
        Sentry.captureException(error, { extra: meta });
      } else {
        Sentry.captureMessage(message, "error");
      }
    }
  },
  debug: (message: string, meta?: any) => {
    if (!isProduction) {
      console.debug(
        JSON.stringify({
          level: "debug",
          message,
          ...meta,
          timestamp: new Date().toISOString(),
        }),
      );
    }
  },
};

// synced
