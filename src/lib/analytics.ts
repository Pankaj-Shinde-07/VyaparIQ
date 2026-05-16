// Lightweight product analytics wrapper
// In production, this can be connected to PostHog, Mixpanel, or custom backend.

export const analytics = {
  identify: (userId: string, traits?: Record<string, any>) => {
    if (import.meta.env.VITE_ENABLE_ANALYTICS) {
      console.log(`[Analytics] Identify: ${userId}`, traits);
      // Example: posthog.identify(userId, traits)
    }
  },

  track: (eventName: string, properties?: Record<string, any>) => {
    if (import.meta.env.VITE_ENABLE_ANALYTICS !== "false") {
      // In dev, just log it. In prod, send it.
      if (import.meta.env.MODE === "development") {
        console.log(`[Analytics Track]: ${eventName}`, properties);
      } else {
        // Here you would send to your analytics provider or internal /api/analytics endpoint
        // Example: posthog.capture(eventName, properties)
      }
    }
  },

  page: (pageName: string, properties?: Record<string, any>) => {
    if (import.meta.env.VITE_ENABLE_ANALYTICS !== "false") {
      if (import.meta.env.MODE === "development") {
        console.log(`[Analytics Page]: ${pageName}`, properties);
      }
    }
  },
};

// synced
