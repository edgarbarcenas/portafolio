/* eslint-disable @next/next/no-img-element -- Rating-star vector repeated per star (the level is also given as sr-only text); not a photographic asset next/image optimises. */
import SkillIcon from "@/components/atoms/SkillIcon";
import type { SkillCategory } from "@/lib/habilidades/skills";

// One Habilidades card: a category title plus a row per skill (icon, its
// star rating out of 5, label). Padding is 30px on every side per the T-05
// spec — Figma's own 50px right padding is unused because content never
// reaches it.
export default function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <article
      className="flex h-full w-full max-w-[315px] flex-col gap-[15px] border-[1.5px] border-crema-borde bg-crema p-[30px] xl:min-h-[521px] xl:w-[315px]"
    >
      <h3 className="font-sans text-[20px] leading-[30px] font-semibold text-negro">{category.title}</h3>
      <ul className="flex flex-col gap-[15px]">
        {category.rows.map((row) => (
          <li key={row.label} className="flex items-start gap-[20px]">
            <SkillIcon icon={row.icon} />
            <div className="flex flex-col gap-[10px]">
              <div aria-hidden="true" className="flex gap-[5px]">
                {Array.from({ length: row.rating ?? 5 }, (_, index) => (
                  <img
                    key={index}
                    src="/figma/inicio/rating-star.svg"
                    alt=""
                    draggable={false}
                    className="block size-[20px] max-w-none"
                  />
                ))}
              </div>
              <span className="font-sans text-[17px] leading-[27px] text-negro">
                {row.label}
                <span className="sr-only">{`, ${row.rating ?? 5} de 5 estrellas`}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
