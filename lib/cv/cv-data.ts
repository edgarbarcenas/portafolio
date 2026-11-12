import { ROUTES } from "@/lib/routes";

// Plain data for the CV page (components/organisms/Curriculum.tsx). Content comes
// verbatim from the developer's CV; contact details (phone, email, street
// address) are intentionally omitted.

export const RESUMEN =
  "Desarrollador Full Stack Senior y Líder Técnico con experiencia en banca, salud, educación y marketplace. Actualmente lidero técnicamente equipos ágiles en Accenture para Banco Ripley, diseñando y construyendo ecosistemas de microservicios en NestJS con arquitectura hexagonal, comunicación gRPC y orientada a eventos con Google Pub/Sub, desplegados en GKE y Cloud Run. Experiencia en diseño de bases de datos, coordinación con equipos de Arquitectura, DevOps, Operaciones Cloud y Networking, y acompañamiento de pasos a producción. En frontend, experiencia con Angular, React y Next.js. Diplomado en Arquitectura de Software.";

// A role split into sub-stages over time (e.g. a long-running client
// engagement with several hats). `periodo` is omitted for stage-less
// summaries such as a standing list of responsibilities.
export type Etapa = {
  titulo: string;
  periodo?: string;
  logros: readonly string[];
};

export type Experiencia = {
  rol: string;
  // Optional: a freelance/independent role has no employer to name.
  empresa?: string;
  // The end client, shown alongside a consultancy's `empresa` (e.g. Accenture / Banco Ripley).
  cliente?: string;
  periodo: string;
  logros: readonly string[];
  etapas?: readonly Etapa[];
};

export const EXPERIENCIA: readonly Experiencia[] = [
  {
    rol: "Senior Full Stack Developer / Líder Técnico",
    empresa: "Accenture Chile",
    cliente: "Banco Ripley",
    periodo: "Dic 2025 – Actualidad",
    logros: [],
    etapas: [
      {
        titulo: "Líder Técnico – Iniciativa Reenganche",
        periodo: "Sep 2026 – Actualidad",
        logros: [
          "Liderazgo técnico de Reenganche, nuevo producto financiero: flujo de más de 20 microservicios con comunicación entre flujos orientada a eventos mediante Pub/Sub.",
        ],
      },
      {
        titulo: "Líder Técnico – Modernización de Avance y Súper Avance",
        periodo: "Mar 2026 – Sep 2026",
        logros: [
          "Construcción del nuevo flujo de contratación: 18 microservicios en NestJS con arquitectura hexagonal, comunicación gRPC y procesos asíncronos con Pub/Sub, desplegados en GKE.",
        ],
      },
      {
        titulo: "Desarrollador de Microservicios",
        periodo: "Dic 2025 – Mar 2026",
        logros: [
          "Microservicios en Cloud Run encargados de notificar a Monitor el curse de Avance, Súper Avance y Crédito de Consumo, con arquitectura orientada a eventos sobre Pub/Sub.",
        ],
      },
      {
        titulo: "Responsabilidades como Líder Técnico",
        logros: [
          "Desarrollo de microservicios y diseño del modelo de base de datos MySQL para el registro de operaciones.",
          "Gestión de tiempos, estimaciones y asignación de tareas del equipo.",
          "Discusiones de diseño de arquitectura con el equipo de Arquitectos.",
          "Coordinación con DevOps (repositorios y pipelines CI/CD), Operaciones Cloud (tópicos y suscripciones Pub/Sub) y Networking (habilitación de reglas de red).",
          "Participación en los pasos a producción y en la mesa de discusión de pasos a producción.",
        ],
      },
    ],
  },
  {
    rol: "Desarrollador de Software",
    empresa: "Seiza SPA",
    periodo: "Abr 2024 – Nov 2025",
    logros: [
      "Desarrollo FullStack Java/Angular en Banco de Chile, creando el módulo de cobro para Vale Vista en el portal privado.",
      "Frontend con Angular y backend con NestJS y MySQL para Sophia, asistente médico.",
      "API de lectura de códigos PDF417 para Banmédica (NestJS y Spring Boot).",
      "Implementación de pruebas unitarias con Jest.",
    ],
  },
  {
    rol: "Líder Técnico Full Stack",
    empresa: "Sii Group",
    periodo: "Feb 2023 – Abr 2024",
    logros: ["Angular, Node.js y MongoDB para app de seguros (Banco Estado)."],
  },
  {
    rol: "Desarrollador Full Stack",
    empresa: "Seiza SPA",
    periodo: "Dic 2021 – Feb 2023",
    logros: [
      "Marketplace Tinku (React Native + NestJS + Firebase).",
      "Módulos GES/CAE para Banmédica (Angular + NestJS + Jest).",
    ],
  },
  {
    rol: "Desarrollador Full Stack",
    empresa: "KDOCE",
    periodo: "Jun 2021 – Dic 2021",
    logros: ["Mantenimiento de plataforma educativa (CodeIgniter, React, MySQL)."],
  },
  {
    rol: "Desarrollador Web Freelancer",
    periodo: "2020",
    logros: ["Sitios WordPress para mecomunico.cl y mujerespoliticas.cl."],
  },
];

export type ProyectoLink =
  | { kind: "interno"; href: string }
  | { kind: "externo"; href: string };

export type Proyecto = {
  nombre: string;
  link?: ProyectoLink;
  descripcion: string;
  tecnologias: readonly string[];
};

export const PROYECTOS: readonly Proyecto[] = [];

export type Educacion = {
  titulo: string;
  institucion: string;
  periodo: string;
};

export const EDUCACION: readonly Educacion[] = [
  { titulo: "Diplomado en Arquitectura de Software", institucion: "Universidad Autónoma de Chile", periodo: "2025" },
  { titulo: "Técnico en Informática", institucion: "Instituto Profesional IPP", periodo: "2021 – 2022" },
  { titulo: "Bachiller en Ciencias", institucion: "Unidad Educativa Rómulo Gallegos", periodo: "2016" },
];

export type Idioma = {
  idioma: string;
  nivel: string;
};

export const IDIOMAS: readonly Idioma[] = [
  { idioma: "Español", nivel: "Nativo" },
  { idioma: "Inglés", nivel: "Intermedio (B1)" },
];
