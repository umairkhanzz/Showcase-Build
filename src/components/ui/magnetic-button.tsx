import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Magnetic } from "./magnetic";

type Variant = "primary" | "secondary" | "accent" | "ink" | "ink-outline";
type Size = "sm" | "md";

/**
 * Each variant defines: the resting button, the fill that rises on hover,
 * and the round icon chip on the right.
 */
const VARIANTS: Record<Variant, { root: string; fill: string; icon: string }> = {
  primary: {
    root: "bg-foreground text-background hover:text-signal-foreground",
    fill: "bg-signal",
    icon: "bg-signal text-signal-foreground group-hover:bg-signal-foreground group-hover:text-signal",
  },
  secondary: {
    root: "border border-foreground/15 text-foreground hover:text-background",
    fill: "bg-foreground",
    icon: "bg-muted text-foreground group-hover:bg-background group-hover:text-foreground",
  },
  accent: {
    root: "bg-signal text-signal-foreground hover:text-background",
    fill: "bg-foreground",
    icon: "bg-signal-foreground text-signal group-hover:bg-background group-hover:text-foreground",
  },
  /** Dark button for use on lime (signal) surfaces. */
  ink: {
    root: "bg-signal-foreground text-white hover:text-signal-foreground",
    fill: "bg-white",
    icon: "bg-signal text-signal-foreground group-hover:bg-signal-foreground group-hover:text-signal",
  },
  /** Outlined companion to `ink`, for lime surfaces. */
  "ink-outline": {
    root: "border border-signal-foreground/25 text-signal-foreground hover:text-signal",
    fill: "bg-signal-foreground",
    icon: "bg-signal-foreground/10 text-signal-foreground group-hover:bg-signal group-hover:text-signal-foreground",
  },
};

const SIZES: Record<Size, { root: string; withIcon: string; icon: string }> = {
  sm: { root: "min-h-10 px-4 text-sm", withIcon: "gap-2.5 py-1 pl-4 pr-1", icon: "size-8" },
  md: { root: "min-h-12 px-6 text-[15px]", withIcon: "gap-3 py-1.5 pl-6 pr-1.5", icon: "size-9" },
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Icon in the round chip. Pass `null` for a text-only button. */
  icon?: LucideIcon | null;
  className?: string;
};

type LinkProps = BaseProps & { href: string; external?: boolean };
type ButtonProps = BaseProps & { href?: undefined } & Omit<ComponentProps<"button">, "children">;

export type MagneticButtonProps = LinkProps | ButtonProps;

/**
 * Pill button with a magnetic pull, a fill that rises from the bottom,
 * rolling text and a rotating icon on hover.
 * Renders a Next `<Link>` when `href` is set, otherwise a `<button>`.
 */
export function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  icon: Icon = ArrowRight,
  className,
  ...rest
}: MagneticButtonProps) {
  const v = VARIANTS[variant];
  const s = SIZES[size];

  const classes = cn(
    "group relative isolate inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full font-medium",
    "transition-[color,transform] duration-500 ease-snap active:scale-[0.97]",
    s.root,
    Icon && s.withIcon,
    v.root,
    className,
  );

  const content = (
    <>
      {/* Fill: starts below the button with a curved top, rises and flattens on hover */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 translate-y-full rounded-t-[50%] transition-[translate,border-radius] duration-500 ease-snap",
          "group-hover:translate-y-0 group-hover:rounded-none",
          v.fill,
        )}
      />
      {/* Label: rolls up and is replaced by an identical copy */}
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-snap group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-snap group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      {Icon && (
        <span
          className={cn(
            "grid shrink-0 place-items-center rounded-full transition-[background-color,color,rotate] duration-500 ease-snap group-hover:-rotate-45",
            s.icon,
            v.icon,
          )}
        >
          <Icon aria-hidden className="size-4" />
        </span>
      )}
    </>
  );

  let element: ReactNode;
  if (isLinkProps(rest)) {
    element = rest.external ? (
      <a href={rest.href} target="_blank" rel="noreferrer" className={classes}>
        {content}
      </a>
    ) : (
      <Link href={rest.href} className={classes}>
        {content}
      </Link>
    );
  } else {
    element = (
      <button type="button" {...rest} className={classes}>
        {content}
      </button>
    );
  }

  return <Magnetic>{element}</Magnetic>;
}

function isLinkProps(rest: object): rest is Pick<LinkProps, "href" | "external"> {
  return "href" in rest && typeof rest.href === "string";
}
