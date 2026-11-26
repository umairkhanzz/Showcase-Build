"use client";

import { useEffect } from "react";

/** Elements that animate in when they enter the viewport. */
const SELECTOR = "[data-reveal]:not([data-visible]), .marker:not([data-visible])";

/**
 * One IntersectionObserver for the whole site. Any element with `data-reveal`
 * (or the `.marker` highlight) gets `data-visible` when it scrolls into view;
 * CSS in globals.css does the actual animation.
 *
 * A MutationObserver picks up elements added later (route changes, filters),
 * so components never need to register themselves.
 */
export function RevealObserver() {
  useEffect(() => {
    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-visible", "");
          intersection.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observeWithin = (root: ParentNode) =>
      root.querySelectorAll(SELECTOR).forEach((el) => intersection.observe(el));

    observeWithin(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(SELECTOR)) intersection.observe(node);
          observeWithin(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersection.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
