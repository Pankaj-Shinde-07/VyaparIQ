import { z } from "zod";

/**
 * Validation schemas for Invoice operations (Medical Module)
 */
export const createInvoiceSchema = z.object({
  body: z.object({
    customerId: z.string().uuid(),
    issueDate: z.string().optional(),
    dueDate: z.string().optional(),
    items: z
      .array(
        z.object({
          productId: z.string().uuid(),
          quantity: z.number().positive(),
          unitPrice: z.number().positive(),
        }),
      )
      .min(1),
    taxTotal: z.number().nonnegative().optional(),
    discountTotal: z.number().nonnegative().optional(),
  }),
});

export const updateInvoiceStatusSchema = z.object({
  body: z.object({
    status: z.enum(["DRAFT", "ISSUED", "PAID", "OVERDUE", "CANCELLED"]),
  }),
});

// synced
