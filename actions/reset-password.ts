"use server";
import { resetSchema } from "../schemas";
import * as z from "zod";
import { getUserByEmail } from "../data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const resetPassword = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email not found" };
  }
  // Todo: send email with reset link
  const passwordResetToken = await generatePasswordResetToken(existingUser.email);
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: "Reset link sent" };
};
