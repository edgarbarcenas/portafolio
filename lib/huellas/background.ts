export const DARK_LUMINANCE = 0.3;

// "rgb(r, g, b)" / "rgba(r, g, b, a)" → [r, g, b, a] (0–255, alpha 0–1).
export function parseColor(value: string): [number, number, number, number] | null {
  const m = value.match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:[ ,/]+([\d.]+))?\s*\)/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])];
}

// WCAG relative luminance of an sRGB colour.
export function luminance(r: number, g: number, b: number): number {
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function isDarkColor(value: string): boolean | null {
  const c = parseColor(value);
  if (!c || c[3] < 0.5) return null; // transparent: look further down
  return luminance(c[0], c[1], c[2]) < DARK_LUMINANCE;
}

// What is under viewport point (x, y)? The trail layer ignores pointer
// events, so elementsFromPoint already skips it. Surfaces painted by images
// (e.g. the purple gradient of the card fronts) declare themselves with
// data-huellas-fondo="oscuro" | "claro"; otherwise the first opaque
// background colour in the stack decides.
export function isDarkAt(x: number, y: number): boolean {
  if (typeof document.elementsFromPoint !== "function") return false;
  for (const el of document.elementsFromPoint(x, y)) {
    const hint = el.closest<HTMLElement>("[data-huellas-fondo]")?.dataset.huellasFondo;
    if (hint) return hint === "oscuro";
    const dark = isDarkColor(getComputedStyle(el).backgroundColor);
    if (dark !== null) return dark;
  }
  return false;
}
