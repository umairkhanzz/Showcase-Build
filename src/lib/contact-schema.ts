import { z } from "zod";
import {
  budgetOptions,
  DETAILS_MAX_LENGTH,
  serviceOptions,
  timelineOptions,
  workTypes,
} from "@/content/contact";

const workTypeValues = workTypes.map((type) => type.value) as [string, ...string[]];

/** Validation for the project brief. Shared by the form (field names) and the server action. */
export const contactSchema = z.object({
  workType: z.enum(workTypeValues, { error: "Pick how you'd like to work together." }),
  name: z.string().trim().min(2, "Please add your name.").max(100),
  email: z.email("That email doesn't look right.").trim(),
  service: z.enum(serviceOptions),
  budget: z.enum(budgetOptions),
  timeline: z.enum(timelineOptions),
  details: z
    .string()
    .trim()
    .min(20, "A couple of sentences helps me reply with a real plan.")
    .max(DETAILS_MAX_LENGTH, `Please keep it under ${DETAILS_MAX_LENGTH} characters.`),
});

export type ContactBrief = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactBrief;

/** What the server action returns to the form. */
export type ContactFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<ContactField, string>> };
