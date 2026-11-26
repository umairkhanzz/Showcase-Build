import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/**
 * Shared rendering for generated images: the favicon / app icons and the
 * social share (Open Graph) cards. These run at build time, so they can't read
 * CSS variables; the hex values below mirror the tokens in globals.css.
 */
export const BRAND = {
  signal: "#bff73b", // --signal
  ink: "#171e0b", // --signal-foreground
  background: "#09090b", // dark --background
  foreground: "#fafafa", // dark --foreground
  muted: "#a1a1aa", // dark --muted-foreground
} as const;

/**
 * Bricolage Grotesque as static TTFs (the image renderer can't use next/font's woff2).
 * Read synchronously once, so the image routes stay prerendered at build time.
 */
const fontDir = join(process.cwd(), "src/assets/fonts");
const fonts = [
  { name: "Bricolage", data: readFileSync(join(fontDir, "bricolage-grotesque-400.ttf")), weight: 400 as const, style: "normal" as const },
  { name: "Bricolage", data: readFileSync(join(fontDir, "bricolage-grotesque-700.ttf")), weight: 700 as const, style: "normal" as const },
];

/** Lime square with a dark capital U, matching Umair's wordmark. */
export function renderIcon(size: number, { rounded = true } = {}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND.signal,
          color: BRAND.ink,
          borderRadius: rounded ? size * 0.22 : 0,
          fontFamily: "Bricolage",
          fontWeight: 700,
          fontSize: size * 0.72,
          letterSpacing: "-0.04em",
          // Optical centring for a capital "U".
          paddingBottom: size * 0.04,
        }}
      >
        U
      </div>
    ),
    { width: size, height: size, fonts },
  );
}

export const OG_SIZE = { width: 1200, height: 630 };

type OgCardOptions = {
  /** Small label above the title, e.g. "Case study". */
  eyebrow: string;
  title: string;
  subtitle?: string;
};

/**
 * 1200×630 share card in the site's dark theme: wordmark, eyebrow, big title.
 * Text only on purpose: the renderer can't decode the WebP screenshots.
 */
export function renderOgCard({ eyebrow, title, subtitle }: OgCardOptions) {
  // Keep long excerpts to about two lines.
  const lead = subtitle && subtitle.length > 140 ? `${subtitle.slice(0, 137).trimEnd()}…` : subtitle;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BRAND.background,
          color: BRAND.foreground,
          fontFamily: "Bricolage",
          padding: 64,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Lime glow in the corner, echoing the site's accent */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -200,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: BRAND.signal,
            opacity: 0.1,
            filter: "blur(80px)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          {/* Wordmark, same as the navbar logo */}
          <div style={{ display: "flex", alignItems: "center", fontSize: 34, fontWeight: 700, letterSpacing: "-0.03em" }}>
            {site.logo.name}
            <span
              style={{
                marginLeft: 4,
                padding: "2px 10px",
                borderRadius: 10,
                background: BRAND.signal,
                color: BRAND.ink,
                fontSize: 28,
              }}
            >
              {site.logo.suffix}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: BRAND.signal,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                marginBottom: 20,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 76,
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
              }}
            >
              {title}
            </div>
            {lead && (
              <div style={{ display: "flex", marginTop: 24, fontSize: 28, lineHeight: 1.35, color: BRAND.muted }}>
                {lead}
              </div>
            )}
          </div>

          <div style={{ display: "flex", fontSize: 24, color: BRAND.muted }}>
            {site.name} · {site.role}
          </div>
        </div>

      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}

/** Profile photo as a data URL, read once (the image renderer needs bytes, not a module import). */
const avatarDataUrl = `data:image/png;base64,${readFileSync(join(process.cwd(), "src/assets/profile/avatar.png")).toString("base64")}`;

type PortfolioBannerOptions = {
  headline: string;
  /** The part of the headline to highlight in lime. */
  highlight: string;
  stats: { value: string; label: string }[];
  /** Shown in the call-to-action pill, e.g. "umair.dev". */
  domain: string;
};

/**
 * The home page share card, also used as the LinkedIn "Featured" banner:
 * photo, role, one clear promise, proof in numbers and where to go.
 * Text sits in the middle ~80% so LinkedIn's card crop never cuts it.
 */
export function renderPortfolioBanner({ headline, highlight, stats, domain }: PortfolioBannerOptions) {
  const [before, after = ""] = headline.split(highlight);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BRAND.background,
          color: BRAND.foreground,
          fontFamily: "Bricolage",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -320,
            left: -220,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: BRAND.signal,
            opacity: 0.09,
            filter: "blur(90px)",
          }}
        />

        {/* Left: who, what, proof, where */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "56px 0 56px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: BRAND.muted }}>
            <div style={{ width: 12, height: 12, borderRadius: 9999, background: BRAND.signal, marginRight: 12 }} />
            {site.name} · {site.role}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 26,
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              maxWidth: 640,
            }}
          >
            <span>{before}</span>
            <span style={{ color: BRAND.signal }}>{highlight}</span>
            <span>{after}</span>
          </div>

          <div style={{ display: "flex", marginTop: 36 }}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingRight: 30,
                  marginRight: 30,
                  borderRight: index < stats.length - 1 ? "1px solid #27272a" : "none",
                }}
              >
                <span style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em" }}>{stat.value}</span>
                <span style={{ fontSize: 19, color: BRAND.muted, marginTop: 2 }}>{stat.label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", marginTop: 40 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 16px 14px 26px",
                borderRadius: 9999,
                background: BRAND.signal,
                color: BRAND.ink,
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              View my portfolio
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  marginLeft: 14,
                  borderRadius: 9999,
                  background: BRAND.ink,
                  color: BRAND.signal,
                  fontSize: 22,
                }}
              >
                →
              </div>
            </div>
            <span style={{ marginLeft: 22, fontSize: 22, color: BRAND.muted }}>{domain}</span>
          </div>
        </div>

        {/* Right: photo card with an availability badge */}
        <div style={{ display: "flex", alignItems: "center", padding: "0 64px 0 0" }}>
          <div
            style={{
              display: "flex",
              position: "relative",
              width: 360,
              height: 460,
              borderRadius: 32,
              overflow: "hidden",
              border: "1px solid #27272a",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
            <img src={avatarDataUrl} alt="" width={460} height={460} style={{ position: "absolute", left: -50, top: 0, width: 460, height: 460 }} />
            <div
              style={{
                position: "absolute",
                left: 18,
                bottom: 18,
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
                borderRadius: 9999,
                background: "rgba(9,9,11,0.85)",
                fontSize: 18,
                color: BRAND.foreground,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 9999, background: "#4ade80", marginRight: 10 }} />
              Available for new projects
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
