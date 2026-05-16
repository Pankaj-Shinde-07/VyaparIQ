import { z } from "zod";

/**
 * Validation schemas for Authentication operations
 */
export const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().optional(),
    role: z
      .enum(["SUPER_ADMIN", "BUSINESS_OWNER", "MANAGER", "STAFF"])
      .optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

// synced
