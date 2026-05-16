import { z } from "zod";

/**
 * Validation schemas for Business (Tenant) operations
 */
export const createBusinessSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Business name is required"),
    gstin: z.string().optional(),
    type: z.enum(["MEDICAL", "KIRANA", "AGRICULTURE", "OTHER"]).optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

export const updateBusinessSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    gstin: z.string().optional(),
    type: z.enum(["MEDICAL", "KIRANA", "AGRICULTURE", "OTHER"]).optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

// synced
