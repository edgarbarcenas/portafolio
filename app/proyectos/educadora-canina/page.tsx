import type { Metadata } from "next";
import SiteNav from "@/components/nav/SiteNav";
import SiteFooter from "@/components/footer/SiteFooter";
import EducadoraCaninaHero from "@/components/proyecto/EducadoraCaninaHero";
import Contacto from "@/components/contacto/Contacto";

export const metadata: Metadata = {
  title: "Educadora Canina · Proyectos · Edgar Barcenas",
  description:
    "Plataforma de gestión de citas para una escuela de educación canina: autenticación, panel administrativo, pagos online y agenda interactiva.",
};

// Figma screen 02. Contact uses the isotype variant, as in the design.
export default function EducadoraCaninaPage() {
  return (
    <>
      <SiteNav current="proyecto" />
      <main className="overflow-x-clip">
        <EducadoraCaninaHero />
        <div className="relative mx-auto w-full max-w-[1280px] pb-12 xl:pb-20">
          <Contacto variant="isotipo" />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
