"use client";

import { useEffect, useRef } from "react";

type MagneticOptions = {
  /** How strongly the element follows the pointer (0–1). */
  strength?: number;
  /** Smoothing per frame (0–1). Lower is floatier. */
  ease?: number;
};

/**
 * Makes an element drift toward the pointer while hovered and spring back on leave.
 * Uses rAF + transform only (no re-renders). Disabled for touch and reduced motion.
 */
export function useMagnetic<T extends HTMLElement>({
  strength = 0.35,
  ease = 0.18,
}: MagneticOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;

    // React to the pointer over the actual button (the first child), not the wrapper:
    // a wrapper stretched by a flex/grid parent would otherwise pull from far away.
    const hit = (el.firstElementChild as HTMLElement | null) ?? el;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const render = () => {
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;

      const settled =
        Math.abs(target.x - current.x) < 0.05 && Math.abs(target.y - current.y) < 0.05;
      frame = settled ? 0 : requestAnimationFrame(render);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      const rect = hit.getBoundingClientRect();
      target.x = (event.clientX - (rect.left + rect.width / 2)) * strength;
      target.y = (event.clientY - (rect.top + rect.height / 2)) * strength;
      start();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      start();
    };

    hit.addEventListener("pointermove", onMove);
    hit.addEventListener("pointerleave", onLeave);
    return () => {
      hit.removeEventListener("pointermove", onMove);
      hit.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      el.style.transform = "";
    };
  }, [strength, ease]);

  return ref;
}
