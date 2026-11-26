"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle, X } from "lucide-react";
import { chat } from "@/content/contact";
import { site } from "@/content/site";
import { Magnetic } from "@/components/ui/magnetic";
import { prefersReducedMotion } from "@/lib/smooth-scroll";
import { cn } from "@/lib/cn";

const firstName = site.shortName;

/** How long the "typing…" dots show before each greeting bubble (ms). */
const TYPING_MS = 900;

/** Current time in your time zone, e.g. "21:11". */
const localTime = () =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: chat.timeZone }).format(new Date());

/**
 * Floating "Message Umair" button (bottom-right on every page). It opens a
 * small chat panel: greeting bubbles appear after a typing indicator, and
 * whatever the visitor writes is handed to email as a pre-filled message.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Close on Escape and hand focus back to the launcher.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      launcherRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {open && <ChatPanel titleId={titleId} onClose={() => setOpen(false)} />}

      <div className="fixed bottom-4 right-4 z-40 sm:bottom-7 sm:right-7">
        <Magnetic>
          <button
            ref={launcherRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-haspopup="dialog"
            className="flex items-center gap-3 rounded-full bg-foreground py-1.5 pl-1.5 pr-5 text-[15px] font-medium text-background shadow-[0_18px_50px_-12px_hsl(var(--foreground)/0.35)] ring-4 ring-foreground/10 transition-transform duration-300 ease-snap active:scale-95"
          >
            <Image
              src={site.avatar}
              alt=""
              sizes="40px"
              className="size-10 rounded-full object-cover ring-2 ring-background/20"
            />
            {open ? (
              <span className="flex items-center gap-1.5">
                <X aria-hidden className="size-4" /> Close
              </span>
            ) : (
              <span>
                Message <span className="hidden sm:inline">{firstName}</span>
              </span>
            )}
          </button>
        </Magnetic>
      </div>
    </>
  );
}

function ChatPanel({ titleId, onClose }: { titleId: string; onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(localTime);
  /** How many greeting bubbles are showing; the typing dots show until all are in. */
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? chat.greeting.length : 0));
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reveal the greeting one bubble at a time, like someone typing.
  useEffect(() => {
    if (shown >= chat.greeting.length) return;
    const timer = window.setTimeout(() => setShown((count) => count + 1), TYPING_MS);
    return () => window.clearTimeout(timer);
  }, [shown]);

  // Keep the local time current while the panel is open.
  useEffect(() => {
    const timer = window.setInterval(() => setTime(localTime()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    textareaRef.current?.focus({ preventScroll: true });
  }, []);

  const typing = shown < chat.greeting.length;

  return (
    <div
      role="dialog"
      aria-labelledby={titleId}
      data-lenis-prevent
      className="fixed inset-x-2 bottom-[76px] top-2 z-50 flex origin-bottom-right animate-chat-in flex-col overflow-hidden rounded-[28px] border border-foreground/10 bg-background shadow-[0_30px_90px_-24px_hsl(var(--foreground)/0.35)] sm:inset-auto sm:bottom-[100px] sm:top-auto sm:right-7 sm:h-[min(620px,calc(100dvh-190px))] sm:w-[400px]"
    >
      <header className="flex shrink-0 items-center gap-3 border-b border-foreground/[0.06] px-4 py-3 sm:px-5">
        <Image src={site.avatar} alt="" sizes="40px" className="size-10 rounded-full object-cover ring-1 ring-foreground/10" />
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="truncate text-[15px] font-semibold leading-5">
            {site.name}
          </h2>
          <p className="truncate text-xs text-muted-foreground">
            {chat.replyTime} · {time} in {chat.timeZoneLabel}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X aria-hidden className="size-[18px]" />
        </button>
      </header>

      {/* Conversation */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-4 pt-6" aria-live="polite">
        <div className="flex items-end gap-2">
          <Image src={site.avatar} alt="" sizes="28px" className="size-7 shrink-0 rounded-full object-cover" />
          <div className="flex flex-col items-start gap-1">
            {chat.greeting.slice(0, shown).map((text) => (
              <p
                key={text}
                className="animate-bubble-in max-w-[85%] rounded-[20px] rounded-bl-[6px] bg-muted px-4 py-2.5 text-[15px] leading-6"
              >
                {text}
              </p>
            ))}
            {typing && <TypingDots />}
          </div>
        </div>
      </div>

      {/* Compose: the message is handed to email */}
      <div className="shrink-0 space-y-3 px-4 pb-4">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-label="Your first message"
          rows={3}
          placeholder={chat.placeholder}
          className="w-full resize-none rounded-[20px] border border-foreground/10 bg-background p-4 text-base leading-6 outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus:border-foreground/25 focus:shadow-[0_0_0_4px_hsl(var(--signal)/0.18)] sm:text-sm"
        />
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent("Project inquiry")}&body=${encodeURIComponent(message.trim() || chat.fallbackMessage)}`}
          className="group flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-signal font-semibold text-signal-foreground shadow-[0_10px_30px_-10px_hsl(var(--signal)/0.7)] transition-transform duration-300 ease-snap hover:scale-[1.015] active:scale-[0.98]"
        >
          <MessageCircle aria-hidden className="size-[18px]" />
          Continue in email
          <ArrowUpRight
            aria-hidden
            className="size-[18px] transition-transform duration-300 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
        <p className="text-center text-xs leading-5 text-muted-foreground">
          Opens your email app with the message ready. Just tap send.
        </p>
        <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
          <Link href={site.contactUrl} onClick={onClose} className="transition-colors hover:text-foreground">
            Prefer a form? <span className="font-medium text-foreground">Send a brief</span>
          </Link>
          <a href={`mailto:${site.email}`} className="underline underline-offset-4 transition-colors hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span
      role="status"
      aria-label={`${firstName} is typing`}
      className={cn("flex h-10 animate-bubble-in items-center gap-1 rounded-[20px] rounded-bl-[6px] bg-muted px-4")}
    >
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          aria-hidden
          className="size-1.5 animate-[typing_1.1s_ease-in-out_infinite] rounded-full bg-muted-foreground"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}
