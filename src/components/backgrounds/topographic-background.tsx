"use client";

import { useEffect, useRef } from "react";
import { heightAt, sampleGrid, traceContour, type HeightGrid } from "@/lib/topography";

/** Tuning knobs, in one place. */
const CONFIG = {
  /** Grid resolution in CSS px. Smaller = smoother lines, more work. */
  cell: 14,
  /** Size of the hills in px. */
  scale: 420,
  /** Contour levels drawn between these heights. */
  minLevel: 0.18,
  maxLevel: 0.82,
  levelStep: 0.032,
  /** How much the terrain drifts as the page scrolls (0 = fixed). */
  parallax: 0.12,
  /** How quickly a newly touched line lights up (ms). */
  fadeInMs: 140,
  /** Time for a line the cursor has left to lose half its glow (ms). */
  fadeOutHalfLifeMs: 450,
  /** At most this many lines glow at once (the faintest drop out first), so it never gets busy. */
  maxLit: 2,
  /** Radius (px) of the soft spotlight that brightens every line near the cursor. */
  spotRadius: 230,
  /** Lit lines are only visible within this radius of the cursor, fading to nothing at the edge. */
  litRadius: 380,
  /** How quickly the spotlight catches up with the cursor (ms); higher = lazier. */
  followMs: 90,
  /** After this long without mouse movement, the gentle "ambient" wander takes over. */
  idleAfterMs: 2500,
  /** Ambient glow is softer than a direct hover. */
  ambientStrength: 0.55,
};

const LEVELS = Array.from(
  { length: Math.floor((CONFIG.maxLevel - CONFIG.minLevel) / CONFIG.levelStep) + 1 },
  (_, i) => CONFIG.minLevel + i * CONFIG.levelStep,
);

/** Index of the contour level nearest to a height. */
const nearestLevel = (height: number) =>
  Math.min(LEVELS.length - 1, Math.max(0, Math.round((height - CONFIG.minLevel) / CONFIG.levelStep)));

/** Theme colours come from the CSS tokens ("H S% L%"), so light and dark just work. */
function readTheme() {
  const styles = getComputedStyle(document.documentElement);
  const isDark = document.documentElement.classList.contains("dark");
  return {
    base: `hsl(${styles.getPropertyValue("--foreground").trim()} / ${isDark ? 0.085 : 0.1})`,
    signal: styles.getPropertyValue("--signal").trim(),
    /** Strength of the spotlight on the lines around the cursor. */
    spotAlpha: isDark ? 0.2 : 0.38,
    /** Brightest a lit line can get; kept lower on dark so it never fights the text. */
    maxAlpha: isDark ? 0.42 : 0.7,
    minWidth: 1,
    extraWidth: isDark ? 0.8 : 1,
    /**
     * Soft halo (dark mode only; on white it just looks blurry). Drawn as a wide,
     * faint stroke under the line: canvas shadowBlur looks similar but costs ~60ms a frame.
     */
    haloWidth: isDark ? 4 : 0,
    haloAlpha: 0.12,
  };
}

/** A slow, looping path across the screen used when nobody is moving the mouse. */
function ambientPoint(time: number, width: number, height: number) {
  return {
    x: width * (0.5 + 0.38 * Math.sin(time * 0.00009)),
    y: height * (0.5 + 0.32 * Math.sin(time * 0.00014 + 1.3)),
  };
}

/**
 * Full-screen topographic map behind the page.
 *
 * A soft lime spotlight follows the cursor and brightens the lines inside its
 * radius. The contour right under the cursor glows a bit more, and lines it has
 * left fade out slowly, so the glow varies in strength. Everything lit fades to
 * nothing at the edge of the radius, so the rest of the map stays calm.
 * When the mouse is idle (or on touch devices) an invisible point drifts across
 * the map so the spotlight keeps softly moving.
 *
 * Canvas only, one draw per animation frame, and the loop sleeps when nothing changes.
 */
export function TopographicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let theme = readTheme();
    let width = 0;
    let height = 0;
    let grid: HeightGrid | null = null;
    let gridOffset = Number.NaN;
    let frame = 0;
    let lastTime = 0;
    let wakeTimer = 0;

    /** Glow strength (0–1) per contour level index. */
    const lit = new Map<number, number>();
    const pointer = { x: 0, y: 0, movedAt: -Infinity };
    /** The spotlight eases towards the probe so it glides rather than jumps. */
    const spot = { x: 0, y: 0, strength: 0, placed: false };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gridOffset = Number.NaN; // force a resample
      requestDraw();
    };

    /** Where the glow is coming from right now, and how strong it should be. */
    const currentProbe = (time: number) => {
      const idle = time - pointer.movedAt > CONFIG.idleAfterMs;
      if (!idle) return { ...pointer, strength: 1 };
      // Reduced motion: no wandering, just one calm line in the middle.
      const point = reduceMotion ? { x: width / 2, y: height / 2 } : ambientPoint(time, width, height);
      return { ...point, strength: CONFIG.ambientStrength };
    };

    /** Ease the spotlight towards the probe. Returns true while it is still moving. */
    const updateSpot = (probe: { x: number; y: number; strength: number }, dt: number) => {
      if (!spot.placed || reduceMotion) {
        Object.assign(spot, probe, { placed: true });
        return false;
      }
      const follow = 1 - Math.exp(-dt / CONFIG.followMs);
      spot.x += (probe.x - spot.x) * follow;
      spot.y += (probe.y - spot.y) * follow;
      spot.strength += (probe.strength - spot.strength) * follow;
      return (
        Math.abs(probe.x - spot.x) > 0.5 ||
        Math.abs(probe.y - spot.y) > 0.5 ||
        Math.abs(probe.strength - spot.strength) > 0.005
      );
    };

    /** Lime that fades out with distance from the spotlight, used as a stroke colour. */
    const spotGradient = (radius: number, alpha: number) => {
      const gradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, radius);
      gradient.addColorStop(0, `hsl(${theme.signal} / ${alpha})`);
      gradient.addColorStop(0.5, `hsl(${theme.signal} / ${alpha * 0.45})`);
      gradient.addColorStop(1, `hsl(${theme.signal} / 0)`);
      return gradient;
    };

    /** Brighten the line under the probe, fade every other line. Returns true while anything is still changing. */
    const updateGlow = (grid: HeightGrid, probe: { x: number; y: number; strength: number }, dt: number) => {
      const active = nearestLevel(heightAt(grid, probe.x, probe.y));
      const fadeIn = reduceMotion ? 1 : 1 - Math.exp(-dt / CONFIG.fadeInMs);
      const fadeOut = reduceMotion ? 0 : Math.pow(0.5, dt / CONFIG.fadeOutHalfLifeMs);

      let changing = false;
      const current = lit.get(active) ?? 0;
      const next = current + (probe.strength - current) * fadeIn;
      lit.set(active, next);
      if (Math.abs(probe.strength - next) > 0.005) changing = true;

      for (const [level, strength] of lit) {
        if (level === active) continue;
        const faded = strength * fadeOut;
        if (faded < 0.015) lit.delete(level);
        else {
          lit.set(level, faded);
          changing = true;
        }
      }

      // Fast mouse sweeps cross many lines; keep only the strongest few.
      if (lit.size > CONFIG.maxLit) {
        const weakest = [...lit].sort((a, b) => a[1] - b[1]).slice(0, lit.size - CONFIG.maxLit);
        for (const [level] of weakest) if (level !== active) lit.delete(level);
      }
      return changing;
    };

    const draw = (time: number) => {
      frame = 0;
      const dt = lastTime ? Math.min(time - lastTime, 100) : 16;
      lastTime = time;

      // Resample the terrain only when the scroll offset actually changed.
      const offset = reduceMotion ? 0 : Math.round(window.scrollY * CONFIG.parallax);
      if (!grid || offset !== gridOffset) {
        grid = sampleGrid(width, height, CONFIG.cell, offset, CONFIG.scale);
        gridOffset = offset;
      }

      const probe = currentProbe(time);
      const spotMoving = updateSpot(probe, dt);
      const changing = updateGlow(grid, probe, dt) || spotMoving;

      ctx.clearRect(0, 0, width, height);

      // 1. Every contour, faint.
      ctx.beginPath();
      for (const level of LEVELS) traceContour(ctx, grid, level);
      ctx.strokeStyle = theme.base;
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. The same contours again in lime, only around the cursor (reuses the path above).
      ctx.strokeStyle = spotGradient(CONFIG.spotRadius, theme.spotAlpha * spot.strength);
      ctx.stroke();

      // 3. Lit contours, dimmest first so the brightest sits on top, fading out with distance.
      const ordered = [...lit].sort((a, b) => a[1] - b[1]);
      for (const [level, strength] of ordered) {
        const alpha = strength * theme.maxAlpha;
        ctx.beginPath();
        traceContour(ctx, grid, LEVELS[level]);
        if (theme.haloWidth) {
          ctx.strokeStyle = spotGradient(CONFIG.litRadius, alpha * theme.haloAlpha);
          ctx.lineWidth = theme.haloWidth * strength;
          ctx.stroke();
        }
        ctx.strokeStyle = spotGradient(CONFIG.litRadius, alpha);
        ctx.lineWidth = theme.minWidth + strength * theme.extraWidth;
        ctx.stroke();
      }

      // Keep going while lines are fading or the ambient point is wandering;
      // otherwise sleep until the mouse goes idle.
      const idle = time - pointer.movedAt > CONFIG.idleAfterMs;
      if (changing || (idle && !reduceMotion)) {
        requestDraw();
      } else {
        lastTime = 0;
        window.clearTimeout(wakeTimer);
        wakeTimer = window.setTimeout(requestDraw, CONFIG.idleAfterMs);
      }
    };

    function requestDraw() {
      if (!frame) frame = requestAnimationFrame(draw);
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.movedAt = performance.now();
      requestDraw();
    };

    // Redraw with new colours when the theme class on <html> changes.
    const themeObserver = new MutationObserver(() => {
      theme = readTheme();
      requestDraw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", requestDraw, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(wakeTimer);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", requestDraw);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10 size-full" />;
}
