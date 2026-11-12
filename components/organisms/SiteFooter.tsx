import IsoEdgar from "@/components/atoms/IsoEdgar";

// Site footer (Figma library component "Navigation / Variant4", 1440 x 194):
// a 63px lila band with the credits, a wavy purple line, then the black bar
// with the isotype and the tagline. Desktop (xl) reproduces the Figma
// geometry; below it the content stacks and centres (responsive proposal,
// not in Figma).
export default function SiteFooter() {
  return (
    <footer className="bg-negro">
      <div className="bg-lila">
        <p className="mx-auto max-w-[1440px] px-6 py-4 text-center font-sans text-[14px] font-medium leading-[1.379] text-negro xl:h-[63px] xl:px-[111px] xl:pb-0 xl:pt-[20px] xl:text-left xl:text-[16px]">
          Desarrollado por Edgar Code{" "}
          <img
            src="/figma/footer/icono.svg"
            alt=""
            aria-hidden="true"
            width={8}
            height={8}
            className="mx-1 inline-block align-baseline"
          />{" "}
          Diseñado por{" "}
          <a
            href="https://brusacrea.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-2 hover:text-purpura"
          >
            Brusacrea
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
          . Todos los derechos reservados.
        </p>
      </div>
      <div className="relative">
        {/* Wavy purple line across the full width (Figma "Line 6"). */}
        <img
          src="/figma/footer/linea.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[8px] block h-[8.1px] w-full max-w-none"
        />
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-6 pb-10 pt-12 xl:relative xl:block xl:h-[131px] xl:p-0">
          <IsoEdgar width={59} className="xl:absolute xl:left-[168px] xl:top-[41px]" />
          <p className="text-center font-sans text-[16px] font-semibold leading-[24px] text-white xl:absolute xl:left-[564px] xl:top-[65px] xl:whitespace-nowrap xl:text-left xl:text-[20px] xl:leading-[30px]">
            Desarrollador Full Stack | Next.js | Angular | NestJS | Prisma | Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
