"use server";
import { db } from "@/lib/db";
import { getVerificationTokenByToken } from "../data/verification-token";
import { getUserByEmail } from "../data/user";

type VerificationToken = {
  id: string;
  email: string;
  token: string;
  expires: Date;
};

export const newVerification = async (token: string) => {
  const existingToken = (await getVerificationTokenByToken(
    token
  )) as VerificationToken;

  if (!existingToken) {
    return { error: "Token not found" };
  }

  const hasExpired = new Date() > existingToken.expires;

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email not found" };
  }
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};
