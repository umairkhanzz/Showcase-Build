import type { ReactNode } from "react";
import { CalendarDays } from "lucide-react";
import { booking } from "@/content/contact";
import { MagneticButton, type MagneticButtonProps } from "@/components/ui/magnetic-button";
import { CalendlyButton } from "./calendly-button";

type BookCallButtonProps = {
  children?: ReactNode;
  variant?: MagneticButtonProps["variant"];
  className?: string;
};

/**
 * Every "book a call" button on the site. Opens your Calendly page in a dialog
 * on top of the current page (`booking.calendlyUrl` in content/contact.ts),
 * or emails you if no Calendly link is set.
 */
export function BookCallButton({ children = "Book a 30-min call", variant, className }: BookCallButtonProps) {
  if (booking.calendlyUrl) {
    return (
      <CalendlyButton url={booking.calendlyUrl} variant={variant} className={className}>
        {children}
      </CalendlyButton>
    );
  }

  return (
    <MagneticButton href={booking.fallbackUrl} external icon={CalendarDays} variant={variant} className={className}>
      {children}
    </MagneticButton>
  );
}
