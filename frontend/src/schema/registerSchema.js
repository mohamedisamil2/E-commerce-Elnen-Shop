import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(5, "The name must be at least 4 characters")
      .max(20, "Them name must be 13 characters or less"),
    email: z.email(4, "please enter a valid email").trim().toLowerCase(),
    password: z
      .string()
      .min(8, "The password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,
        "Password must contain at least one upperCase letter, one lowerCase letter, and one number, and special characters",
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
