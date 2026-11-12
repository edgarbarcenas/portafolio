import { MOTION, prefersReducedMotion } from "./motion";

// cubic-bezier(0.42, 0, 0.58, 1) sampled by bisection on x.
function easeInOut(t: number): number {
  const bez = (a: number, b: number, s: number) =>
    3 * a * s * (1 - s) ** 2 + 3 * b * s * s * (1 - s) + s ** 3;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    if (bez(0.42, 0.58, mid) < t) lo = mid;
    else hi = mid;
  }
  return bez(0, 1, (lo + hi) / 2);
}

// Scrolls to a section the way the prototype does (300 ms, ease-in-out),
// then moves focus there so keyboard and screen-reader users land with it.
export function scrollToSection(id: string, duration: number = MOTION.scrollMs): void {
  const target = document.getElementById(id);
  if (!target) return;

  const focusTarget = () => {
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    history.replaceState(null, "", `#${id}`);
  };

  const start = window.scrollY;
  const end = start + target.getBoundingClientRect().top;
  if (prefersReducedMotion() || duration <= 0) {
    window.scrollTo(0, end);
    focusTarget();
    return;
  }

  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, start + (end - start) * easeInOut(p));
    if (p < 1) requestAnimationFrame(step);
    else focusTarget();
  };
  requestAnimationFrame(step);
}
