// The intro (Figma screen 00) shows once per browser session, only on "/" and
// only when no section anchor was requested. The decision runs before first
// paint (inline script in app/layout.tsx) so the portfolio never flashes
// under the overlay.

export const INTRO_SEEN_KEY = "intro-visto";

export const INTRO_PREPAINT_SCRIPT = `(function(){try{var d=document.documentElement;var seen=sessionStorage.getItem("${INTRO_SEEN_KEY}")==="1";var home=location.pathname==="/";d.dataset.intro=(home&&!location.hash&&!seen)?"show":"skip";}catch(e){document.documentElement.dataset.intro="skip";}})();`;

export function markIntroSeen(): void {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    // Storage blocked: the intro may show again next load, which is harmless.
  }
  document.documentElement.dataset.intro = "skip";
}
