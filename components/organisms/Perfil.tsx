import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

// Figma screen 03 "Bio", block page y 144-682 (538 tall), bg lila.
// Coordinates in comments are block-relative (page y - 144).
export default function Perfil() {
  return (
    <section className="relative bg-lila xl:h-[538px]">
      {/* Responsive proposal (not in Figma): below xl, breadcrumb then photo
          then name then bio then tagline stack in a single column with 24 px
          padding; from xl up every piece sits at its exact Figma coordinate. */}
      <div className="flex flex-col gap-8 px-6 py-6 xl:block xl:px-0 xl:py-0">
        <nav aria-label="Ruta" className="xl:absolute xl:left-[110px] xl:top-[35px]">
          <ol className="flex items-center gap-3.5">
            <li className="flex">
              {/* Figma: the 15px icon sits 2px below the top of the 24px text line. */}
              <Link href={ROUTES.home} className="flex items-start gap-2 text-base font-medium leading-6 text-negro">
                <img src="/figma/bio/icon-home.svg" alt="" aria-hidden="true" width={15} height={15} className="mt-0.5 block" />
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="flex">
              <img src="/figma/bio/icon-arrow.svg" alt="" width={16} height={7} className="block" />
            </li>
            <li className="flex">
              <span aria-current="page" className="text-base font-extrabold leading-6 text-purpura">
                CV
              </span>
            </li>
          </ol>
        </nav>

        <Image
          src="/figma/bio/foto-edgar.png"
          alt="Fotografía de Edgar Barcenas"
          width={207}
          height={257}
          className="border border-negro object-cover xl:absolute xl:left-[244px] xl:top-[120px]"
        />

        <h1 className="text-[40px] font-bold leading-[35px] text-negro xl:absolute xl:left-[244px] xl:top-[397px] xl:w-[208px]">
          Edgar Barcenas
        </h1>

        <p className="max-w-[515px] text-[17px] leading-[27px] text-negro xl:absolute xl:left-[522px] xl:top-[120px] xl:w-[515px] xl:max-w-none">
          <strong className="font-bold">Bio:</strong>
          <br />
          Padre de 2 perros, 5 unicornios &amp; 1 novia, Desarrollo desde que tengo
          memoria. A menudo me preguntan de dónde saco mi inspiración: de los
          pequeños detalles cotidianos. Y a veces de los restos de comida que me
          dejan los perros.
        </p>

        <p className="text-[20px] font-semibold leading-[30px] text-negro xl:absolute xl:left-[522px] xl:top-[408px] xl:w-[557px]">
          Desarrollador Full Stack | Next.js | Angular | NestJS | Prisma | Supabase
        </p>
      </div>
    </section>
  );
}
