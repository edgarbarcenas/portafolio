export type CardFace = "front" | "back";

export type CardId = "frontend" | "backend" | "especializacion";

export type CardSpec = {
  id: CardId;
  // Accessible specialty name used in the toggle button's label.
  name: string;
  art: string;
  initialFace: CardFace;
  // Figma keeps a trailing space on the first title word; kept verbatim on
  // both the front title and the back heading.
  titleLine1: string;
  titleLine2: string;
  frontSize1: number;
  frontSize2: number;
  // Especialización overrides the front title colour to the accent (lila) for legibility.
  frontClassName?: string;
  backItems: string[];
};

export const EXPERIENCIA_CARDS: readonly CardSpec[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    art: "/figma/inicio/card-frontend.png",
    initialFace: "front",
    titleLine1: "Frontend ",
    titleLine2: "Development",
    frontSize1: 48,
    frontSize2: 40,
    backItems: [
      "Construcción de interfaces modernas, rápidas y accesibles, enfocadas en experiencia de usuario y rendimiento.",
      "Desarrollo con React, Next.js y Angular",
      "Apps móviles con React Native (marketplace Tinku)",
      "Dashboards administrativos con TailwindCSS y Shadcn",
      "Paneles de agendamiento con FullCalendar",
      "Formularios dinámicos con Formik y Yup",
      "Manejo de estado global con Redux Toolkit",
      "Autenticación con NextAuth y mapas con Leaflet",
    ],
  },
  {
    id: "backend",
    name: "Backend Development",
    art: "/figma/inicio/card-backend.png",
    initialFace: "front",
    titleLine1: "Backend ",
    titleLine2: "Development",
    frontSize1: 48,
    frontSize2: 40,
    backItems: [
      "Arquitecturas robustas, seguras y escalables para soportar productos de alto impacto.",
      "Microservicios en NestJS con arquitectura hexagonal",
      "Comunicación entre servicios vía gRPC",
      "Arquitectura orientada a eventos con Google Pub/Sub",
      "Despliegues en GKE y Cloud Run",
      "Diseño de modelos de datos en MySQL",
      "Pipelines CI/CD y coordinación con DevOps",
      "APIs REST con NestJS, Node.js y Spring Boot",
    ],
  },
  {
    id: "especializacion",
    name: "Especialización Técnica",
    art: "/figma/inicio/card-especializacion.png",
    initialFace: "front",
    titleLine1: "Especialización ",
    titleLine2: "Técnica",
    frontSize1: 35,
    frontSize2: 40,
    frontClassName: "text-lila",
    backItems: [
      "Soluciones avanzadas para proyectos que requieren mayor complejidad técnica.",
      "Liderazgo técnico en Accenture para Banco Ripley",
      "Flujos de 18 y de más de 20 microservicios",
      "Participación en pasos a producción",
      "Coordinación con Arquitectura, DevOps, Cloud y Networking",
      "Liderazgo técnico previo en Sii Group (Banco Estado)",
      "Diplomado en Arquitectura de Software (U. Autónoma, 2025)",
      "Proyectos en banca, salud, educación y marketplace",
    ],
  },
] as const;

// xl-only absolute placement (1440 reference), static strings so Tailwind's
// content scanner can see them — see components/organisms/Experiencia.tsx.
export const CARD_XL_POSITION: Record<CardId, string> = {
  frontend: "xl:absolute xl:left-[168px] xl:top-[188px]",
  backend: "xl:absolute xl:left-[559px] xl:top-[188px]",
  especializacion: "xl:absolute xl:left-[950px] xl:top-[188px]",
};
