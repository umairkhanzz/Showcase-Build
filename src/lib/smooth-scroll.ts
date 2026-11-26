/**
 * Shared access to the page's Lenis smooth-scroll instance. Components call
 * these helpers instead of importing Lenis, so everything keeps working when
 * Lenis is disabled (reduced motion) or hasn't started yet.
 */
import type Lenis from "lenis";

let activeLenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null): void {
  activeLenis = instance;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Smoothly scrolls the page to a vertical offset in pixels. */
export function scrollWindowTo(top: number): void {
  if (activeLenis) {
    activeLenis.scrollTo(top, { duration: 1.2 });
    return;
  }
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "instant" : "smooth" });
}

/** Stops page scrolling while an overlay (e.g. the mobile menu) is open. */
export function setPageScrollLocked(locked: boolean): void {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) activeLenis?.stop();
  else activeLenis?.start();
}
