import { z } from "zod";

export const registerSchema = z.object({

  username: z.string({
    required_error: "Username is required",
  })
  .min(4, { message: "Username must be at least 4 characters" }),

  email: z.string({
      required_error: "Email is required",
  })
  .email({ message: "Please enter a valid email address" }),

  password: z.string({
    required_error: "Password is required",
  })
  .min(8, { message: "Password must be at least 8 characters"})
  .regex(/[A-Z]/, { message: "The password must contain at least one capital letter."})
  .regex(/[a-z]/, { message: "Password must have at least one lowercase letter"})
  .regex(/[0-9]/, { message: "The password must have at least one number"}),

});

export const loginSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
});
