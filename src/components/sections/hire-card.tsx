import { site } from "@/content/site";
import { Avatar } from "@/components/ui/avatar";
import { MagneticButton } from "@/components/ui/magnetic-button";

/** Lime "hire me" card shown beside blog content. */
export function HireCard() {
  return (
    <aside className="rounded-[28px] bg-signal p-7 text-signal-foreground">
      <div className="flex items-center gap-3">
        <Avatar className="ring-signal" />
        <div className="leading-tight">
          <p className="font-medium">{site.name}</p>
          <p className="text-sm opacity-70">{site.role} for hire</p>
        </div>
      </div>
      <p className="mt-6 font-display text-2xl font-semibold leading-tight tracking-[-0.03em]">
        I engineer modern, scalable products.
      </p>
      <p className="mt-2 text-sm opacity-75">Full-stack apps, FinTech, Web3 and AI, built end to end.</p>
      <div className="mt-6">
        <MagneticButton href="/pricing" variant="ink" className="w-full">
          See plans
        </MagneticButton>
      </div>
      <p className="mt-3 text-center text-xs opacity-70">Fixed quote within one business day.</p>
    </aside>
  );
}
