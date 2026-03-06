/**
 * coverflow_scroll.js — v2 (fixed)
 * ─────────────────────────────────────────────────────────────────
 * Fixes vs v1:
 *   1. Runs synchronously on DOMContentLoaded — first card is active
 *      BEFORE first paint (no 120ms delay, no flash).
 *   2. Batched DOM writes — only touches classList when state actually
 *      changes, eliminating unnecessary style recalcs.
 *   3. Single RAF gate — never queues more than 1 pending frame.
 *   4. No cfActiveGlow animation restart — glow is static box-shadow.
 * ─────────────────────────────────────────────────────────────────
 */

(function () {
  "use strict";

  const ACTIVE_ZONE = 0.20; // card centre within ±20% of viewport height = active
  const CLASSES = ["coverflow-active", "coverflow-above", "coverflow-below"];

  let rafPending = false;

  function getDesiredClass(rect) {
    const mid   = window.innerHeight / 2;
    const zone  = window.innerHeight * ACTIVE_ZONE;
    const delta = (rect.top + rect.height / 2) - mid;

    if (Math.abs(delta) <= zone) return "coverflow-active";
    return delta < 0 ? "coverflow-above" : "coverflow-below";
  }

  function applyEffect() {
    rafPending = false;
    const cards = document.querySelectorAll(".exp-card");
    if (!cards.length) return;

    cards.forEach(card => {
      const desired = getDesiredClass(card.getBoundingClientRect());
      // Skip DOM write if class is already correct
      if (!card.classList.contains(desired)) {
        CLASSES.forEach(c => card.classList.remove(c));
        card.classList.add(desired);
      }
    });
  }

  function scheduleUpdate() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(applyEffect);
    }
  }

  function init() {
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    // Synchronous first run — sets classes before browser paints
    applyEffect();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init(); // already parsed
  }
})();