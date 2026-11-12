import Link from "next/link";
import Huellita from "@/components/atoms/Huellita";
import { placementStyle } from "@/lib/placement";
import { EDUCACION, EXPERIENCIA, IDIOMAS, PROYECTOS, RESUMEN } from "@/lib/cv/cv-data";

// Paw accent, block-relative centre (1255.2, 56.3) (page 833.3 - 777),
// 62.16 x 51.03, Figma rot -27.43 -> CSS rotate(27.43deg). Same placement as
// the former Trayectoria block so the desktop Estrella overlap still works.
const PAW_PLACEMENT = { w: 62.16, h: 51.03, cx: 1255.2, cy: 56.3, rot: -27.43 } as const;

// Shared type scale: sub-headings match SkillCard titles, body matches Perfil.
const SUBTITLE = "text-[20px] leading-[30px] font-semibold text-negro";
const BODY = "text-[17px] leading-[27px] text-negro";

// Figma screen 03 "Bio", block page y 777+, bg white, replaces the former
// Trayectoria paragraph with the developer's CV (skills are skipped — the
// home page already has a Habilidades section).
export default function Curriculum() {
  return (
    <section className="relative bg-blanco">
      <div className="mx-auto flex max-w-[880px] flex-col gap-12 px-6 py-16 xl:px-0 xl:py-[102px]">
        <h2 className="font-sans text-[32px] font-semibold text-negro">Currículum</h2>

        <article className="flex flex-col gap-3">
          <h3 className={SUBTITLE}>Resumen Profesional</h3>
          <p className={BODY}>{RESUMEN}</p>
        </article>

        <article className="flex flex-col gap-6">
          <h3 className={SUBTITLE}>Experiencia Profesional</h3>
          <ul className="flex flex-col gap-6">
            {EXPERIENCIA.map((item) => (
              <li key={`${item.rol}-${item.periodo}`} className="flex flex-col gap-3">
                <p className={BODY}>
                  <strong className="font-bold">{item.rol}</strong>
                  {item.empresa && <> — {item.empresa}</>}
                  {item.cliente && <> · Cliente: {item.cliente}</>}{" "}
                  <span className="text-purpura">({item.periodo})</span>
                </p>
                {item.logros.length > 0 && (
                  <ul className="list-disc pl-5">
                    {item.logros.map((logro) => (
                      <li key={logro} className={BODY}>
                        {logro}
                      </li>
                    ))}
                  </ul>
                )}
                {item.etapas && item.etapas.length > 0 && (
                  <ul className="flex flex-col gap-3 pl-5">
                    {item.etapas.map((etapa) => (
                      <li key={etapa.titulo} className="flex flex-col gap-2">
                        <p className={`${BODY} italic`}>
                          {etapa.titulo}
                          {etapa.periodo && (
                            <>
                              {" "}
                              <span className="text-purpura">({etapa.periodo})</span>
                            </>
                          )}
                        </p>
                        <ul className="list-disc pl-5">
                          {etapa.logros.map((logro) => (
                            <li key={logro} className={BODY}>
                              {logro}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </article>

        {PROYECTOS.length > 0 && (
          <article className="flex flex-col gap-6">
            <h3 className={SUBTITLE}>Proyectos Destacados</h3>
            <ul className="flex flex-col gap-6">
              {PROYECTOS.map((proyecto) => (
                <li key={proyecto.nombre} className="flex flex-col gap-2">
                  <p className={BODY}>
                    <strong className="font-bold">{proyecto.nombre}</strong>
                    {proyecto.link?.kind === "interno" && (
                      <>
                        {" "}
                        —{" "}
                        <Link href={proyecto.link.href} className="text-purpura underline">
                          Ver proyecto
                        </Link>
                      </>
                    )}
                    {proyecto.link?.kind === "externo" && (
                      <>
                        {" "}
                        —{" "}
                        <a
                          href={proyecto.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purpura underline"
                        >
                          Ver demo
                          <span className="sr-only"> (se abre en una pestaña nueva)</span>
                        </a>
                      </>
                    )}
                  </p>
                  <p className={BODY}>{proyecto.descripcion}</p>
                  <p className="text-[17px] leading-[27px] text-purpura">{proyecto.tecnologias.join(", ")}</p>
                </li>
              ))}
            </ul>
          </article>)}

        <article className="flex flex-col gap-3">
          <h3 className={SUBTITLE}>Educación</h3>
          <ul className="flex flex-col gap-2">
            {EDUCACION.map((item) => (
              <li key={item.titulo} className={BODY}>
                <strong className="font-bold">{item.titulo}</strong>, {item.institucion}{" "}
                <span className="text-purpura">({item.periodo})</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="flex flex-col gap-3">
          <h3 className={SUBTITLE}>Idiomas</h3>
          <ul className="flex flex-col gap-2">
            {IDIOMAS.map((item) => (
              <li key={item.idioma} className={BODY}>
                <strong className="font-bold">{item.idioma}:</strong> {item.nivel}
              </li>
            ))}
          </ul>
        </article>
      </div>
      {/* Responsive proposal (not in Figma): the paw only shows at the
          pixel-accurate xl layout — its Figma coordinates would overflow a
          narrower viewport. */}
      <Huellita className="hidden xl:block" style={placementStyle(PAW_PLACEMENT)} />
    </section>
  );
}
