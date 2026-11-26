import { CalendarDays, Check } from "lucide-react";
import { booking } from "@/content/contact";
import { BookCallButton } from "./book-call-button";

/** "Prefer to talk? Book a call." Summary of the call plus a button that opens Calendly in a new tab. */
export function BookingCard() {
  return (
    <section aria-labelledby="booking-heading" className="rounded-[28px] border border-foreground/10 bg-card p-6 md:p-8">
      <h2 id="booking-heading" className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
        Prefer to talk? Book a call.
      </h2>

      <div className="mt-6 rounded-2xl border border-foreground/10 bg-background p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-signal text-signal-foreground">
            <CalendarDays aria-hidden className="size-5" />
          </span>
          <p className="font-display text-xl font-semibold">{booking.title}</p>
        </div>
        <ul className="mt-6 space-y-2.5">
          {booking.details.map((detail) => (
            <li key={detail} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <Check aria-hidden className="size-4 text-signal-text" />
              {detail}
            </li>
          ))}
        </ul>
        <BookCallButton className="mt-8">Pick a time</BookCallButton>
      </div>
    </section>
  );
}
