import nodemailer from "nodemailer";

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service (e.g., Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${domain}/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: "next Auth <noreply@next14-auth-masterclass-pearl.vercel.app/.com>",
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
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  const mailOptions = {
    from: "next Auth <noreply@next14-auth-masterclass-pearl.vercel.app/.com>",
    to: email,
    subject: "Click the link to reset your password",
    html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">Reset Your Password</h2>
                <p>Please click the link below to reset your password:</p>
                <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>If you did not request a password reset, you can ignore this email.</p>
                <p>Thanks,<br>The Acme Team</p>
            </div>
        `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: "next Auth <noreply@next14-auth-masterclass-pearl.vercel.app/.com>",
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
  };

  await transporter.sendMail(mailOptions);
};
