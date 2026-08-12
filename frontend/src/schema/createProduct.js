import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, "Product name must be at least 4 characters")
    .max(100, "Product name is too long"),

//   image: z.string().url("Please enter a valid image URL"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description is too long"),

  price: z.coerce.number("Price must be greater than 0"),

  category: z.string().trim().min(3, "Category must be at least 3 characters"),

  countInStock: z
    .coerce.number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),
});
