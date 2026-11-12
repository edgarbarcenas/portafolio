import IntroOverlay from "@/components/intro/IntroOverlay";
import SiteNav from "@/components/nav/SiteNav";
import SiteFooter from "@/components/footer/SiteFooter";
import Hero from "@/components/inicio/hero/Hero";
import Tecnologias from "@/components/inicio/tecnologias/Tecnologias";
import Experiencia from "@/components/inicio/experiencia/Experiencia";
import Proyectos from "@/components/inicio/proyectos/Proyectos";
import Habilidades from "@/components/inicio/habilidades/Habilidades";
import Contacto from "@/components/contacto/Contacto";
import HuellasTrail from "@/components/inicio/huellas/HuellasTrail";

// Figma screen 01 (home), with screen 00 (intro) as an overlay shown once per
// session. Section order follows the handoff note.
export default function Home() {
  return (
    <>
      <IntroOverlay />
      <HuellasTrail />
      <SiteNav current="home" />
      <main className="overflow-x-clip">
        <Hero />
        <Tecnologias />
        <Experiencia />
        {/* Breathing room under the contact form (not in Figma, which ends the
            page at the form). */}
        <div className="mx-auto w-full max-w-[1280px] pb-12 xl:pb-20">
          <Proyectos />
          <Habilidades />
          <Contacto variant="ilustracion" />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
