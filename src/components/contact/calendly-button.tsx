"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { CalendarDays, Loader2, X } from "lucide-react";
import { MagneticButton, type MagneticButtonProps } from "@/components/ui/magnetic-button";
import { setPageScrollLocked } from "@/lib/smooth-scroll";

/** Hex colour (no #) from one of our "H S% L%" CSS tokens, so Calendly matches the theme. */
function tokenHex(name: string) {
  const [h, s, l] = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
    .split(/\s+/)
    .map((part) => parseFloat(part));
  const sat = s / 100;
  const light = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const channel = (n: number) => light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [0, 8, 4].map((n) => Math.round(channel(n) * 255).toString(16).padStart(2, "0")).join("");
}

/**
 * Calendly's inline-embed link, coloured for the current theme:
 * the card colour as background, our text colour, and lime (dark) or a
 * readable dark green (light) for dates, buttons and links.
 */
function embedUrl(url: string) {
  const dark = document.documentElement.classList.contains("dark");
  const themed = new URL(url);
  themed.searchParams.set("embed_domain", window.location.host);
  themed.searchParams.set("embed_type", "Inline");
  themed.searchParams.set("hide_gdpr_banner", "1");
  themed.searchParams.set("background_color", tokenHex("--card"));
  themed.searchParams.set("text_color", tokenHex("--foreground"));
  themed.searchParams.set("primary_color", tokenHex(dark ? "--signal" : "--signal-text"));
  return themed.toString();
}

type CalendlyButtonProps = {
  /** Your Calendly event link, e.g. https://calendly.com/your-name/30min */
  url: string;
  children: ReactNode;
  variant?: MagneticButtonProps["variant"];
  className?: string;
};

/**
 * Opens your Calendly booking page in our own dialog, on top of the page
 * (never a new tab). The dialog matches the site's theme; Calendly itself
 * runs in an iframe inside it.
 */
export function CalendlyButton({ url, children, variant, className }: CalendlyButtonProps) {
  const [src, setSrc] = useState<string | null>(null);

  return (
    <>
      <MagneticButton icon={CalendarDays} variant={variant} className={className} onClick={() => setSrc(embedUrl(url))}>
        {children}
      </MagneticButton>
      {src && <CalendlyDialog src={src} onClose={() => setSrc(null)} />}
    </>
  );
}

function CalendlyDialog({ src, onClose }: { src: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [loaded, setLoaded] = useState(false);

  // Open as a modal (focus trap, Escape to close, page behind is inert) and freeze page scroll.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    setPageScrollLocked(true);
    // No dialog.close() here: its "close" event would call onClose after a remount
    // (React Strict Mode runs effects twice) and shut the dialog straight away.
    // Unmounting removes the dialog anyway.
    return () => setPageScrollLocked(false);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      data-lenis-prevent
      onClose={onClose}
      // Clicking the dimmed backdrop (the dialog element itself, outside the panel) closes it.
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-auto size-full max-h-none max-w-none bg-transparent p-2 backdrop:bg-black/60 backdrop:backdrop-blur-sm sm:p-6"
    >
      {/* Kept under ~600px wide on purpose: Calendly then uses its full-bleed layout,
          which takes our theme colours edge to edge (wider, it adds a white page around its card). */}
      <div className="mx-auto flex h-full max-h-[820px] max-w-[560px] animate-chat-in flex-col overflow-hidden rounded-[28px] border border-foreground/10 bg-card text-foreground shadow-2xl">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-foreground/10 px-5 py-3 sm:px-6">
          <h2 id={titleId} className="font-display text-lg font-semibold tracking-[-0.02em]">
            Book a call
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X aria-hidden className="size-5" />
          </button>
        </header>

        <div className="relative min-h-0 flex-1">
          {!loaded && (
            <div className="absolute inset-0 grid place-items-center text-muted-foreground">
              <Loader2 aria-label="Loading calendar" className="size-6 animate-spin" />
            </div>
          )}
          <iframe
            src={src}
            title="Calendly booking calendar"
            onLoad={() => setLoaded(true)}
            className="size-full border-0"
          />
        </div>
      </div>
    </dialog>
  );
}
