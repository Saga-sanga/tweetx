import { z } from "zod";

export const signupFormSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2)
      .max(50)
      .trim(),
    email: z.string({ required_error: "Email is required" }).email().trim(),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32)
      .trim(),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
