import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${domain}/auth/verify-email?token=${token}`;
  
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Please verify your email",
    html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">Verify Your Email Address</h2>
                <p>Thank you for signing up! Please verify your email address by clicking the link below:</p>
                <a href="${confirmationLink}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p>If you did not sign up for this account, you can ignore this email.</p>
                <p>Thanks,<br>The Acme Team</p>
            </div>
        `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "click the link to reset your password",
    html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">Verify Your Email Address</h2>
                <p>Thank you for signing up! Please verify your email address by clicking the link below:</p>
                <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p>If you did not sign up for this account, you can ignore this email.</p>
                <p>Thanks,<br>The Acme Team</p>
            </div>
        `,
  });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Your two-factor authentication code",
    html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">Your two-factor authentication code</h2>
                <p>Here is your two-factor authentication code:</p>
                <h3 style="color: #333; font-size: 2rem; margin: 20px 0;">${token}</h3>
                <p>If you did not request this code, you can ignore this email.</p>
                <p>Thanks,<br>The Acme Team</p>
            </div>
        `,
  });
};
