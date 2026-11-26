"use client";

import { startTransition, useActionState, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { sendProjectBrief } from "@/app/contact/actions";
import {
  budgetOptions,
  DETAILS_MAX_LENGTH,
  serviceOptions,
  timelineOptions,
  workTypes,
} from "@/content/contact";
import type { ContactField, ContactFormState } from "@/lib/contact-schema";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/cn";

const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/40 aria-[invalid=true]:border-red-500/70";

/** "Tell me what you need" project brief form. */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendProjectBrief, initialState);
  const [workType, setWorkType] = useState<string>("unsure");
  const [detailsLength, setDetailsLength] = useState(0);

  const errorFor = (field: ContactField) => (state.status === "error" ? state.fieldErrors?.[field] : undefined);

  // Submitting through onSubmit (instead of letting React run the action) stops React
  // from resetting the form, so a validation error never wipes what the visitor typed.
  // `action` stays on the <form> as the no-JavaScript fallback.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  if (state.status === "success") {
    return (
      <div role="status" className="flex animate-fade-in flex-col items-start py-10">
        <CheckCircle2 aria-hidden className="size-10 text-signal-text" />
        <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em]">Brief received.</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot for bots: hidden from people and screen readers */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <fieldset>
        <legend className="mb-3 text-sm font-medium">How would you like to work together?</legend>
        <div className="grid grid-cols-3 gap-2">
          {workTypes.map((type) => {
            const selected = workType === type.value;
            return (
              <label
                key={type.value}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-3 text-sm leading-tight transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-foreground",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/10 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                <input
                  type="radio"
                  name="workType"
                  value={type.value}
                  checked={selected}
                  onChange={() => setWorkType(type.value)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "size-3 shrink-0 rounded-full border transition-colors",
                    selected ? "border-signal bg-signal" : "border-foreground/30",
                  )}
                />
                {type.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" required error={errorFor("name")} htmlFor="contact-name">
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Jane Founder"
            required
            aria-invalid={!!errorFor("name")}
            className={inputClass}
          />
        </Field>
        <Field label="Email" required error={errorFor("email")} htmlFor="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            aria-invalid={!!errorFor("email")}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <SelectField label="Service" name="service" options={serviceOptions} />
        <SelectField label="Budget" name="budget" options={budgetOptions} />
        <SelectField label="Timeline" name="timeline" options={timelineOptions} />
      </div>

      <Field label="Project details" required error={errorFor("details")} htmlFor="contact-details">
        <textarea
          id="contact-details"
          name="details"
          rows={6}
          required
          maxLength={DETAILS_MAX_LENGTH}
          onChange={(event) => setDetailsLength(event.target.value.length)}
          placeholder="What are you building? Share goals, scope, links and anything else useful."
          aria-invalid={!!errorFor("details")}
          className={cn(inputClass, "resize-y")}
        />
        <span className="mt-1.5 block text-right font-mono text-xs text-muted-foreground">
          {detailsLength}/{DETAILS_MAX_LENGTH}
        </span>
      </Field>

      {state.status === "error" && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {state.message}
        </p>
      )}

      <div>
        <MagneticButton type="submit" icon={Send} disabled={pending} className="disabled:opacity-60">
          {pending ? "Sending…" : "Send project brief"}
        </MagneticButton>
        <p className="mt-3 text-sm text-muted-foreground">I reply within 24 hours on weekdays.</p>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

function Field({ label, htmlFor, required, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">
        {label} {required && <span className="font-normal text-muted-foreground">(required)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: readonly string[] }) {
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <select id={id} name={name} defaultValue={options[0]} className={cn(inputClass, "cursor-pointer appearance-none bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat pr-10")} style={{ backgroundImage: CHEVRON }}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Small chevron for the custom-styled selects (uses currentColor-like grey). */
const CHEVRON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;
