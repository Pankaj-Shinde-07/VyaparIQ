import { z } from "zod";

export const assignModuleSchema = z.object({
  body: z.object({
    moduleId: z.string().uuid(),
    expiresAt: z.string().optional(),
  }),
});

export const createModuleSchema = z.object({
  body: z.object({
    code: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    pricePerMonth: z.number().nonnegative().optional(),
  }),
});

// synced
