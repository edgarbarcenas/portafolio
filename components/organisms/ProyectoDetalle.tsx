import Image from "next/image";
import type { Project } from "@/lib/proyectos/proyectos-data";

// Project page body (/proyectos/[slug]). Not in Figma: it reuses the beige
// block and purple lead of the original project screen, with text in place
// of mockups because the client systems are internal.
export default function ProyectoDetalle({ project }: { project: Project }) {
  return (
    <section className="bg-beige">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-6 py-12 md:py-16 xl:flex-row xl:gap-20 xl:px-[110px] xl:py-24">
        <div className="flex flex-col gap-6 xl:w-[520px] xl:shrink-0">
          <Image
            src={project.client.logo.src}
            alt={project.client.logo.alt}
            width={project.client.logo.width}
            height={project.client.logo.height}
            priority
            className="h-auto w-[200px]"
          />
          <h1 className="font-sans text-[32px] leading-[42px] font-semibold text-negro">{project.title}</h1>
          <p className="text-[16px] leading-[1.379] text-black-soft">
            {project.role} · {project.period}
            <br />
            {project.context}
          </p>
          <p className="text-[24px] font-bold leading-[1.379] text-purpura">{project.summary}</p>
          {project.description.map((paragraph) => (
            <p key={paragraph} className="text-[16px] leading-[1.379] text-negro">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="font-sans text-[20px] leading-[30px] font-semibold text-negro">Arquitectura y aportes</h2>
            <ul className="flex flex-col gap-3">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-[16px] leading-[1.379] text-negro">
                  <span aria-hidden="true" className="mt-[7px] size-2 shrink-0 rounded-full bg-purpura" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-sans text-[20px] leading-[30px] font-semibold text-negro">Tecnologías</h2>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-purpura bg-blanco px-4 py-1 text-[14px] leading-[22px] text-purpura-oscuro"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
