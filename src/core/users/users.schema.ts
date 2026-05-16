import { z } from "zod";

export const getMeSchema = z.object({});
export const updateMeSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }),
});

// synced
