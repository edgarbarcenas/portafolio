import SkillCard from "./SkillCard";
import { SKILL_CATEGORIES } from "./skills";

export default function Habilidades() {
  return (
    <section
      id="habilidades"
      className="mx-auto flex w-full max-w-[1280px] flex-col bg-blanco px-4 pt-10 pb-10 md:px-6 xl:px-[100px] xl:pt-[100px] xl:pb-[40px]"
    >
      <h2 className="text-center font-sans text-[32px] leading-normal font-semibold text-negro xl:leading-[27px]">
        Habilidades Técnicas
      </h2>
      {/* Responsive proposal (not in Figma): 1 col mobile, 2 tablet, 3 desktop;
          5 cards in 3 columns leaves the 6th slot empty, as in Figma. */}
      <ul className="mt-8 grid w-full grid-cols-1 items-start gap-x-[67.5px] gap-y-5 md:grid-cols-2 xl:gap-y-[37px] xl:mt-[55px] xl:grid-cols-3">
        {SKILL_CATEGORIES.map((category) => (
          <li key={category.title} className="mx-auto w-full max-w-[315px] xl:mx-0">
            <SkillCard category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}
