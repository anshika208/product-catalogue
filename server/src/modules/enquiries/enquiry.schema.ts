
import { z } from "zod";

export const enquirySchema = z.object({
  productId: z.number().int().positive(),

  name: z.string().trim().min(2).max(100),

  email: z.string().trim().email().max(254),

  phone: z.string().trim().max(20).optional(),

  message: z.string().trim().min(10).max(1000)
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
