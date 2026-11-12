import TechLogo from "@/components/atoms/TechLogo";

type Logo = {
  src: string;
  alt: string;
  // Height at 100 px width, from each SVG's aspect ratio (they stretch to the box).
  height: number;
};

const LOGOS: readonly Logo[] = [
  { src: "/figma/inicio/logo-nextjs.svg", alt: "Next.js", height: 100 },
  { src: "/figma/inicio/logo-angular.svg", alt: "Angular", height: 100 },
  { src: "/figma/inicio/logo-nestjs.svg", alt: "NestJS", height: 96 },
  { src: "/figma/skills/react.svg", alt: "React", height: 89 },
  { src: "/figma/skills/google-cloud.svg", alt: "Google Cloud Platform", height: 100 },
];

// Technologies strip, Figma screen 01 ("Logos" box), 1440 x 291.
// The box is 1078 x 167 with an inside 2 px accent (lila) border top and bottom; five
// 100 x 100 logos (y 33, NestJS y 35/h 96) are centred vertically and spread
// with `justify-between`, which reproduces the handoff's explicit x offsets
// (0, 244.5, 489, 733.5, 978) exactly for five 100 px items in a 1078 px row.
// Each logo shows its name in the lime chip as a hover tooltip (TechLogo).
export default function Tecnologias() {
  return (
    <section className="relative bg-white px-6 py-10 xl:mx-auto xl:h-[291px] xl:w-[1440px] xl:px-0 xl:py-0">
      {/* Responsive proposal (not in Figma): wraps into a centred grid below
          xl (3 then 2 per row), keeping the green top/bottom rule. */}
      <ul
        aria-label="Tecnologías principales"
        className="mx-auto flex max-w-[1078px] flex-wrap items-center justify-center gap-x-10 gap-y-6 border-y-2 border-lila py-6 xl:absolute xl:left-[181px] xl:top-0 xl:h-[167px] xl:w-[1078px] xl:flex-nowrap xl:justify-between xl:gap-0 xl:py-0"
      >
        {LOGOS.map((logo) => (
          <li key={logo.src} className="flex w-[100px] shrink-0 items-center justify-center">
            <TechLogo src={logo.src} name={logo.alt} height={logo.height} />
          </li>
        ))}
      </ul>
    </section>
  );
}
