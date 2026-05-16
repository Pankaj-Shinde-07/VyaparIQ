import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    sku: z.string().optional(),
    price: z.number().nonnegative(),
    stock: z.number().int().nonnegative().optional(),
    barcode: z.string().optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    sku: z.string().optional(),
    price: z.number().nonnegative().optional(),
    stock: z.number().int().nonnegative().optional(),
    barcode: z.string().optional(),
  }),
});

// synced
