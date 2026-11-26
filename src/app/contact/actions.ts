"use server";

import { contactChannels, workTypes } from "@/content/contact";
import { contactSchema, type ContactField, type ContactFormState } from "@/lib/contact-schema";
import { EmailNotConfiguredError, sendEmail } from "@/lib/email";

/**
 * Validates the project brief and emails it to the site owner.
 * Used with `useActionState`, so it receives the previous state first.
 */
export async function sendProjectBrief(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("company")) {
    return { status: "success", message: "Thanks! I'll reply within one business day." };
  }

  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      fieldErrors[field] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const brief = parsed.data;
  const workType = workTypes.find((type) => type.value === brief.workType)?.label ?? brief.workType;

  try {
    await sendEmail({
      subject: `New project brief from ${brief.name}`,
      replyTo: brief.email,
      text: [
        `Name: ${brief.name}`,
        `Email: ${brief.email}`,
        `Work type: ${workType}`,
        `Service: ${brief.service}`,
        `Budget: ${brief.budget}`,
        `Timeline: ${brief.timeline}`,
        "",
        brief.details,
      ].join("\n"),
    });
  } catch (error) {
    console.error("[contact] failed to send brief:", error);
    const reason =
      error instanceof EmailNotConfiguredError ? "The form isn't connected yet." : "Something went wrong sending that.";
    return { status: "error", message: `${reason} Please email me at ${contactChannels.email} instead.` };
  }

  return { status: "success", message: "Thanks! Your brief is in. I'll reply within one business day." };
}
