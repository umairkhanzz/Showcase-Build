"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { prefersReducedMotion, registerLenis } from "@/lib/smooth-scroll";

/**
 * Inertial smooth scrolling with Lenis. Lenis still moves the real window
 * scroll position, so sticky elements and scroll listeners keep working.
 * Skipped entirely for reduced-motion users.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: { offset: -90 } });
    registerLenis(lenis);

    return () => {
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
