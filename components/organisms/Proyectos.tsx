import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

type Project = {
  id: string;
  image: { src: string; alt: string };
  title: string;
  description: string;
  href: string;
};

// Only real projects are listed. Figma showed two more cards that do not
// exist; they were removed on request and their grid slots stay empty.
const PROJECTS: Project[] = [
  {
    id: "educadora-canina",
    image: {
      src: "/figma/inicio/project-educadora.png",
      alt: "Logotipo de Educadora Canina Chile",
    },
    title: "Educadora Canina",
    description: "Plataforma de gestión de citas para una escuela de educación canina.",
    href: ROUTES.educadoraCanina,
  },
];

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
        {PROJECTS.map((project) => {
          const content = (
            <article className="flex flex-col gap-[25px]">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={315}
                height={315}
                sizes="(min-width: 1280px) 315px, (min-width: 768px) 45vw, 90vw"
                className="h-auto w-full max-w-[315px]"
              />
              <div className="flex flex-col gap-[10px]">
                <h3 className="font-sans text-[20px] leading-[30px] font-semibold text-negro">
                  {project.title}
                </h3>
                <p className="font-sans text-[17px] leading-[27px] text-black-soft">
                  {project.description}
                </p>
              </div>
            </article>
          );

          return (
            <li key={project.id} className="mx-auto w-full max-w-[315px] xl:mx-0">
              <Link href={project.href} className="block">
                {content}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
