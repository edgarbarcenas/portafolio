import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteNav from "@/components/organisms/SiteNav";
import SiteFooter from "@/components/organisms/SiteFooter";
import ProyectoDetalle from "@/components/organisms/ProyectoDetalle";
import Contacto from "@/components/organisms/Contacto";
import { PROJECTS, getProject } from "@/lib/proyectos/proyectos-data";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} · Proyectos · Edgar Barcenas`,
    description: project.summary,
  };
}

export default async function ProyectoPage({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  // Only the listed projects exist; any other slug is a 404.
  if (!project) notFound();

  return (
    <>
      <SiteNav current="proyecto" />
      <main className="overflow-x-clip">
        <ProyectoDetalle project={project} />
        <div className="relative mx-auto w-full max-w-[1280px] pb-12 xl:pb-20">
          <Contacto variant="isotipo" />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
