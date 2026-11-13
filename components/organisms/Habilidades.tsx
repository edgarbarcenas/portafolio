import SkillCard from "@/components/molecules/SkillCard";
import { SKILL_CATEGORIES } from "@/lib/habilidades/skills";

export default function Habilidades() {
  return (
    <section
      id="habilidades"
      className="mx-auto flex w-full max-w-[1280px] flex-col bg-blanco px-4 pt-10 pb-10 md:px-6 xl:px-[100px] xl:pt-[100px] xl:pb-[40px]"
    >
      <h2 className="text-center font-sans text-[32px] leading-normal font-semibold text-negro xl:leading-[27px]">
        Habilidades Técnicas
      </h2>
      {/* Responsive proposal (not in Figma): a swipeable carousel on mobile
          (scroll-snap, edge to edge, the next card peeking so it reads as
          scrollable), 2 cols tablet, 3 desktop; cards in a row stretch to the
          same height. */}
      <ul className="relative -mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 items-stretch gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:static md:mx-0 md:grid md:w-full md:snap-none md:grid-cols-2 md:gap-x-[67.5px] md:gap-y-5 md:overflow-visible md:px-0 md:pb-0 xl:mt-[55px] xl:grid-cols-3 xl:gap-y-[37px]">
        {SKILL_CATEGORIES.map((category) => (
          <li key={category.title} className="flex w-[85%] max-w-[315px] shrink-0 snap-start snap-always md:mx-auto md:w-full xl:mx-0">
            <SkillCard category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}
