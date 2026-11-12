import type { Metadata } from "next";
import SiteNav from "@/components/nav/SiteNav";
import SiteFooter from "@/components/footer/SiteFooter";
import BioFondo from "@/components/bio/BioFondo";
import Perfil from "@/components/bio/Perfil";
import Estrella from "@/components/bio/Estrella";
import { ESTRELLA_PLACEMENT } from "@/components/bio/estrella-placement";
import Trayectoria from "@/components/bio/Trayectoria";
import Contacto from "@/components/contacto/Contacto";
import HuellasTrail from "@/components/inicio/huellas/HuellasTrail";
import { placementStyle } from "@/lib/placement";

export const metadata: Metadata = {
  title: "Bio · Edgar Barcenas",
  description: "Quién es Edgar Barcenas, desarrollador Full Stack autodidacta.",
};

// Figma screen 03. Page-relative layout at 1440: nav 0–143, profile 144–682,
// star centred at (219.5, 764.5) overlapping both blocks, trajectory 777–1089,
// contact at (80, 1137), page height 1926.
export default function BioPage() {
  return (
    <div className="relative isolate overflow-x-clip">
      <BioFondo />
      <HuellasTrail />
      <SiteNav current="bio" />
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
        <Trayectoria />
        <div className="mx-auto w-full max-w-[1280px] pt-12 pb-12 xl:pb-20">
          <Contacto variant="ilustracion" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
