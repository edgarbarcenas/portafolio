export type CardFace = "front" | "back";

export type CardId = "frontend" | "backend" | "especializacion";

export type CardSpec = {
  id: CardId;
  // Accessible specialty name used in the toggle button's label.
  name: string;
  art: string;
  initialFace: CardFace;
  // Figma keeps a trailing space on the first title word (see spec note);
  // kept verbatim on both the front title and the back heading.
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
      "Diseño responsive y componentes reutilizables",
      "Integración de calendarios, formularios dinámicos y dashboards",
      "Estilos con TailwindCSS y Shadcn",
      "Optimización de performance y SEO",
      "Autenticación y manejo de sesiones (NextAuth, JWT)",
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
      "APIs REST con NestJS, Node.js y Spring Boot",
      "Arquitecturas multi-tenant",
      "Integración con bases de datos relacionales y no relacionales",
      "Autenticación y autorización (JWT, Passport)",
      "Documentación con Swagger",
      "Pruebas unitarias con Jest",
      "Contenerización y despliegue en Docker, Cloud Run y Vercel",
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
      "Arquitectura multi-tenant",
      "Sistemas de agendamiento y gestión de citas",
      "Integración de pagos online",
      "Lectura de códigos PDF417",
      "Despliegues productivos en Cloud Run y Vercel",
      "Enfoque en arquitectura de software y buenas prácticas",
    ],
  },
] as const;

// xl-only absolute placement (1440 reference), static strings so Tailwind's
// content scanner can see them — see components/inicio/experiencia/Experiencia.tsx.
export const CARD_XL_POSITION: Record<CardId, string> = {
  frontend: "xl:absolute xl:left-[168px] xl:top-[188px]",
  backend: "xl:absolute xl:left-[559px] xl:top-[188px]",
  especializacion: "xl:absolute xl:left-[950px] xl:top-[188px]",
};
