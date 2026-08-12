import z from "zod";

export const couponSchema = z.object({
  code: z
    .string()
    .min(3, "The Code Coupon must be at least 3 characters")
    .max(10, "The Code Coupon must less than 10 characters"),
  discountPercentage: z
    .number()
    .min(1, "Discount must be at least 1%")
    .max(100, "Discount cannot exceed 100%"),
//   expirationDate: z.coerce.date(),
  expiresInHours: z.number().min(1, "Expiration must be at least 1 hour"),
  isActive: z.boolean(),
});
