import type { Metadata } from "next";
import SiteNav from "@/components/organisms/SiteNav";
import SiteFooter from "@/components/organisms/SiteFooter";
import BioFondo from "@/components/atoms/BioFondo";
import Perfil from "@/components/organisms/Perfil";
import Estrella from "@/components/atoms/Estrella";
import { ESTRELLA_PLACEMENT } from "@/lib/cv/estrella-placement";
import Curriculum from "@/components/organisms/Curriculum";
import Contacto from "@/components/organisms/Contacto";
import HuellasTrail from "@/components/organisms/HuellasTrail";
import { placementStyle } from "@/lib/placement";

export const metadata: Metadata = {
  title: "CV · Edgar Barcenas",
  description:
    "Desarrollador de software con experiencia en frontend y backend, especializado en Angular, NestJS, Next.js, React y Google Cloud Platform.",
};

// Figma screen 03. Page-relative layout at 1440: nav 0–143, profile 144–682,
// star centred at (219.5, 764.5) overlapping both blocks, CV block starting
// at 777, contact at (80, 1137), page height 1926.
export default function CvPage() {
  return (
    <div className="relative isolate overflow-x-clip">
      <BioFondo />
      <HuellasTrail />
      <SiteNav current="cv" />
      <main>
        <Perfil />
        {/* Desktop: the star sits at its page coordinates over the gap. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden xl:block">
          <div className="relative mx-auto w-[1440px]">
            <div className="pointer-events-auto" style={placementStyle(ESTRELLA_PLACEMENT)}>
              <Estrella />
            </div>
          </div>
        </div>
        <div className="hidden h-[95px] xl:block" aria-hidden="true" />
        {/* Responsive proposal (not in Figma): the star sits between blocks. */}
        <div className="flex justify-center py-8 xl:hidden">
          <div style={{ transform: `rotate(${-(ESTRELLA_PLACEMENT.rot ?? 0)}deg)` }}>
            <Estrella />
          </div>
        </div>
        <Curriculum />
        <div className="mx-auto w-full max-w-[1280px] pt-12 pb-12 xl:pb-20">
          <Contacto variant="ilustracion" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
