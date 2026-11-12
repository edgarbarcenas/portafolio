import Image from "next/image";
import ScaleToFit from "@/components/atoms/ScaleToFit";

// Figma screen 02, block between the nav (page y 143) and the contact section
// (page y 961). Coordinates in comments are block-relative (page y - 143).
export default function EducadoraCaninaHero() {
  return (
    // Responsive proposal (not in Figma): below xl a flat beige block replaces
    // the organic shape, which would otherwise stop halfway through the text.
    <section className="relative overflow-x-clip bg-beige xl:h-[818px] xl:bg-transparent">
      {/* Organic background shape, page (0, 104) -> block-relative (0, -39),
          1438 x 909. Overflows the block on purpose; only horizontal
          overflow is clipped. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector art, decorative organic shape */}
      <img
        src="/figma/proyecto/hero-bg.svg"
        alt=""
        aria-hidden="true"
        draggable={false}
        // Exact 1438x909 at its Figma offset (desktop only; see the section).
        className="pointer-events-none absolute left-0 top-[-39px] z-0 hidden h-[909px] w-[1438px] xl:block"
      />

      {/* Responsive proposal (not in Figma): below xl, text then mockups
          stack in a single column with 24px side padding; from xl up both
          are positioned absolutely at their exact Figma coordinates. */}
      <div className="relative z-10 flex flex-col gap-10 px-6 pb-12 pt-12 md:py-16 xl:block xl:px-0 xl:py-0">
        <div className="xl:absolute xl:left-[110px] xl:top-[273px] xl:w-[463px]">
          <h1 className="sr-only">Educadora Canina</h1>
          <p className="text-[24px] font-bold leading-[1.379] text-purpura">
            Plataforma de gestión de citas para una escuela de educación canina.
          </p>
          <p className="mt-6 text-[16px] font-normal leading-[1.379] text-negro">
            Incluye autenticación, panel administrativo, pagos online y agenda interactiva.
          </p>
        </div>

        {/* Phones (responsive proposal): the 750px composition would shrink the
            phone mockup to ~85px, so the web mockup bleeds to full width and the
            phone mockup overlaps its lower right, larger. */}
        <div className="md:hidden">
          <div className="relative -mx-6 aspect-[750/438]">
            <Image
              src="/figma/proyecto/mockup-web.png"
              alt="Mockup de escritorio de Educadora Canina: página Clase en Sede con agenda"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="relative ml-auto mr-2 -mt-[22%] aspect-[186/427] w-[38%] max-w-[180px]">
            <Image
              src="/figma/proyecto/mockup-movil.png"
              alt="Mockup móvil de Educadora Canina: agenda de citas"
              fill
              sizes="180px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="hidden md:block xl:absolute xl:left-[602px] xl:top-[160px] xl:w-[750px]">
          <ScaleToFit width={750} height={596}>
            <div className="relative h-full w-full">
              {/* Web mockup, page (602, 303) -> block-relative (602, 160), 750x438. */}
              <div className="absolute left-0 top-0 h-[438px] w-[750px]">
                <Image
                  src="/figma/proyecto/mockup-web.png"
                  alt="Mockup de escritorio de Educadora Canina: página Clase en Sede con agenda"
                  fill
                  sizes="750px"
                  className="object-cover"
                />
              </div>
              {/* Mobile mockup, page (1100, 472) -> block-relative (1100, 329),
                  186x427, stacked above the web mockup. */}
              <div className="absolute left-[498px] top-[169px] z-10 h-[427px] w-[186px]">
                <Image
                  src="/figma/proyecto/mockup-movil.png"
                  alt="Mockup móvil de Educadora Canina: agenda de citas"
                  fill
                  sizes="186px"
                  className="object-cover"
                />
              </div>
            </div>
          </ScaleToFit>
        </div>
      </div>
    </section>
  );
}
