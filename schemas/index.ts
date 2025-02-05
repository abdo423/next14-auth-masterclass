import { UserRole } from "@prisma/client";
import * as z from "zod";
import { newPassword } from "../actions/new-password";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (!data.newPassword && data.password) {
        return false;
      }

      return true;
    },
    { message: " new password are required !", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    { message: "  password are required !", path: ["password"] }
  );
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, {
    message: "Name is required",
  }),
  password: z.string().min(6, {
    message: "min 6 characters required",
  }),
});

export const resetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "min 6 characters required",
  }),
});
