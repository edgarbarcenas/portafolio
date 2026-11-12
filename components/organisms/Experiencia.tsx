import Layer from "@/components/atoms/Layer";
import ExperienciaCard from "@/components/molecules/ExperienciaCard";
import Huellita from "@/components/atoms/Huellita";
import { placementStyle, type Placement } from "@/lib/placement";
import { CARD_XL_POSITION, EXPERIENCIA_CARDS } from "@/lib/experiencia/cards-data";

// Figma spots: section-relative centres (origin = section's own top-left);
// negative y reaches above the section, on purpose.
// All four share one size (developer request; Figma mixed four sizes): the
// 41.93 x 34.42 paw from the design.
const PAW_W = 41.93;
const PAW_H = 34.42;
const PAWS: readonly Placement[] = [
  { w: PAW_W, h: PAW_H, cx: 318.4, cy: -28.2, rot: -17.92 },
  { w: PAW_W, h: PAW_H, cx: 226.1, cy: -51.4, rot: 25.68 },
  { w: PAW_W, h: PAW_H, cx: 209.4, cy: -89.2, rot: 8.19 },
  { w: PAW_W, h: PAW_H, cx: 266.8, cy: -93, rot: 59.54 },
];

// Server Component: only the toggling Card leaf is a client component. The
// animated footprint trail is a separate page layer (components/organisms/HuellasTrail.tsx).
export default function Experiencia() {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-heading"
      className="relative overflow-visible bg-white xl:mx-auto xl:h-[899px] xl:w-[1440px]"
    >
      <Layer src="/figma/inicio/experience-bg.svg" inset="1px 0 0 0" />

      <h2
        id="experiencia-heading"
        className="relative z-10 mx-auto max-w-[384px] px-4 pt-16 text-center font-sans text-[32px] font-semibold leading-[42px] text-black-soft xl:absolute xl:left-[528px] xl:top-[96px] xl:w-[384px] xl:max-w-none xl:px-0 xl:pt-0"
      >
        Desarrollador Full Stack
      </h2>

      <div className="relative z-10 mt-10 flex flex-col items-center gap-8 px-4 pb-16 xl:mt-0 xl:block xl:px-0 xl:pb-0">
        {EXPERIENCIA_CARDS.map((card) => (
          <div key={card.id} className={CARD_XL_POSITION[card.id]}>
            <ExperienciaCard card={card} />
          </div>
        ))}
      </div>

      {/* Static Figma paws (desktop xl: their spots rely on the 1440 geometry). */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden xl:block" aria-hidden="true">
        {PAWS.map((paw, i) => (
          <Huellita key={i} style={placementStyle(paw)} />
        ))}
      </div>
    </section>
  );
}
