import Image from "next/image";

// Figma screen 03 "Bio", decorative backdrop layer: 1440 x 1926, opaque
// #fafafa with faint grey shapes, behind every section on the page. The page
// composer wraps the Bio sections in a `relative` container; this fills that
// container's full height (driven by the sibling sections' flow height).
export default function BioFondo() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <Image src="/figma/bio/deco.png" alt="" fill sizes="100vw" className="object-cover" />
    </div>
  );
}
