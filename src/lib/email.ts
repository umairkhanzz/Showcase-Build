import "server-only";

/** Thrown when the email provider isn't configured (see .env.example). */
export class EmailNotConfiguredError extends Error {
  constructor() {
    super("Email is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL.");
  }
}

type SendEmailInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

/**
 * Sends a plain-text email to the site owner through Resend's HTTP API.
 * Swap this one function to use another provider; nothing else needs to change.
 */
export async function sendEmail({ subject, text, replyTo }: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  if (!apiKey || !to) throw new EmailNotConfiguredError();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, text, reply_to: replyTo }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}
