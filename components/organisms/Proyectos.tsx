import Image from "next/image";
import Link from "next/link";
import { PROJECTS, projectHref } from "@/lib/proyectos/proyectos-data";

export default function Proyectos() {
  return (
    <section
      id="proyectos"
      className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10 bg-blanco px-4 py-5 md:px-6 xl:min-h-[660px] xl:gap-[60px] xl:px-[100px]"
    >
      <h2 className="text-center font-sans text-[32px] leading-[42px] font-semibold text-negro">
        Proyectos destacados
      </h2>
      {/* Responsive proposal (not in Figma): 1 col mobile, 2 tablet, 3 desktop */}
      <ul className="grid w-full grid-cols-1 gap-x-[67.5px] gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((project) => (
          <li key={project.slug} className="mx-auto w-full max-w-[315px] xl:mx-0">
            <Link href={projectHref(project.slug)} className="group block">
              <article className="flex flex-col gap-[25px]">
                {/* Square tile in place of a screenshot: the client systems are
                    internal, so the card shows the client's official logo. */}
                <div className="flex aspect-square w-full max-w-[315px] flex-col items-center justify-center gap-6 bg-[#f7f2fa] px-8 transition-colors group-hover:bg-lila">
                  <Image
                    src={project.client.logo.src}
                    alt={project.client.logo.alt}
                    width={project.client.logo.width}
                    height={project.client.logo.height}
                    className="h-auto w-[200px]"
                  />
                  <p className="text-center font-sans text-[15px] leading-[22px] text-black-soft">
                    {project.role}
                    <br />
                    {project.period}
                  </p>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <h3 className="font-sans text-[20px] leading-[30px] font-semibold text-negro">
                    {project.title}
                  </h3>
                  <p className="font-sans text-[17px] leading-[27px] text-black-soft">
                    {project.summary}
                  </p>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
