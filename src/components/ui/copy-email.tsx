"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

/** Email as a mailto link, with a button beside it that copies the address. */
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  // Swap the check mark back to the copy icon after a moment.
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the mailto link still works.
    }
  };

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <a href={`mailto:${email}`} className="font-medium underline decoration-current/40 underline-offset-[6px] hover:decoration-current">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="grid size-8 place-items-center rounded-full transition-colors hover:bg-current/10"
      >
        {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </span>
  );
}
