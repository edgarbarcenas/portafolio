import IsoEdgar from "@/components/common/IsoEdgar";
import ScaleToFit from "@/components/common/ScaleToFit";
import Banner from "./Banner";

// Home hero, Figma screen 01 ("Elementos banner" + left column), 1440 x 767.
// Geometry below is section-relative, matching the handoff at the 1440 px
// reference; see .claude/parallel/specs/T-03-hero-tech.md.
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative bg-white px-6 py-16 xl:mx-auto xl:h-[767px] xl:w-[1440px] xl:px-0 xl:py-0"
    >
      {/* Responsive proposal (not in Figma): stacked column below xl, 24 px
          side padding; exact Figma geometry restored at xl via absolute
          positioning on the same elements. */}
      <div className="flex flex-col gap-10 xl:absolute xl:left-[180px] xl:top-[218px] xl:block xl:w-[557px] xl:gap-0">
        <p className="font-sans text-[20px] font-semibold leading-[30px] xl:absolute xl:inset-x-0 xl:top-0">
          Desarrollador Full Stack | Next.js | Angular | NestJS | Prisma | Supabase
        </p>

        <h1 className="relative h-[164px] w-[374px] max-w-full xl:absolute xl:left-0 xl:top-[100px]">
          <span className="sr-only">Edgar Barcenas</span>
          {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector wordmark, exact pixel geometry */}
          <img
            src="/figma/inicio/wordmark.svg"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 block size-full"
          />
          <IsoEdgar width={112} className="absolute left-[252px] top-0" />
        </h1>

        <p className="font-sans text-[17px] leading-[27px] xl:absolute xl:inset-x-0 xl:top-[304px]">
          Focus programming is my passion and my every day, all day ;D
        </p>
      </div>

      {/* ScaleToFit keeps the banner at its exact 510 x 392 Figma geometry at
          xl (its container is capped at 510 px there, so scale resolves to
          1) and shrinks it uniformly on narrower viewports. */}
      <ScaleToFit
        width={510}
        height={392}
        className="mx-auto mt-10 xl:absolute xl:left-[765px] xl:top-[188px] xl:mx-0 xl:mt-0"
      >
        <Banner />
      </ScaleToFit>
    </section>
  );
}
