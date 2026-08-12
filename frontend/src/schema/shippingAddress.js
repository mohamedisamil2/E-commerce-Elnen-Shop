import z from "zod";

export const shippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(10, "The full name must be at least 10 characters")
    .max(20, "The full name must less than 20 characters"),
  city: z.string().max(10, "The City must less than 10 characters"),
  street: z.string().max(10, "The Street must less than 10 characters"),
  phone: z.string().max(15, "The phone must less than 10 characters"),
  postalCode: z.string().max(10, "The Postalcode must less than 10 characters"),
  paymentMethod: z.enum(["cash", "Online"], {
    error: "Please select a payment method",
  }),
});
