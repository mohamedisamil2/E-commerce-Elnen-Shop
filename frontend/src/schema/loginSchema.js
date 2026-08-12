import z from "zod";
export const loginSchema = z.object({
  email: z.email("please enter a valid email"),
  password: z.string().min(6, "password must be at least 6 characters"),
});
