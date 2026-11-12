import IntroOverlay from "@/components/organisms/IntroOverlay";
import SiteNav from "@/components/organisms/SiteNav";
import SiteFooter from "@/components/organisms/SiteFooter";
import Hero from "@/components/organisms/Hero";
import Tecnologias from "@/components/organisms/Tecnologias";
import Experiencia from "@/components/organisms/Experiencia";
import Proyectos from "@/components/organisms/Proyectos";
import Habilidades from "@/components/organisms/Habilidades";
import Contacto from "@/components/organisms/Contacto";
import HuellasTrail from "@/components/organisms/HuellasTrail";

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
        {/* Not in Figma: breathing room under the contact form. */}
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
