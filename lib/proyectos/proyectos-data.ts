// Projects shown on the home page (#proyectos) and on /proyectos/[slug].
// All three were built from Accenture for Banco Ripley Chile.

export type ProjectClient = {
  name: string;
  // Official logo, taken from bancoripley.cl.
  logo: { src: string; width: number; height: number; alt: string };
};

export type Project = {
  slug: string;
  title: string;
  // One line for the home card and the page description.
  summary: string;
  role: string;
  period: string;
  client: ProjectClient;
  // Who the work was delivered for and from where.
  context: string;
  description: readonly string[];
  highlights: readonly string[];
  stack: readonly string[];
};

const BANCO_RIPLEY: ProjectClient = {
  name: "Banco Ripley",
  logo: {
    src: "/proyectos/logo-banco-ripley.svg",
    width: 240,
    height: 52,
    alt: "Logotipo de Banco Ripley",
  },
};

const CONTEXT = "Accenture para Banco Ripley Chile";

export const PROJECTS: readonly Project[] = [
  {
    slug: "reenganche",
    title: "Reenganche",
    summary: "Nuevo producto financiero construido sobre un flujo de más de 20 microservicios.",
    role: "Líder Técnico",
    period: "Sep 2026 - Actualidad",
    client: BANCO_RIPLEY,
    context: CONTEXT,
    description: [
      "Liderazgo técnico de Reenganche, un nuevo producto financiero de Banco Ripley.",
      "El producto se compone de un flujo de más de 20 microservicios, donde la comunicación entre flujos es orientada a eventos mediante Google Pub/Sub.",
    ],
    highlights: [
      "Más de 20 microservicios orquestados en un mismo flujo de negocio.",
      "Comunicación entre flujos orientada a eventos con Pub/Sub.",
      "Gestión de tiempos, estimaciones y asignación de tareas del equipo.",
      "Coordinación con Arquitectura, DevOps, Operaciones Cloud y Networking.",
    ],
    stack: ["NestJS", "Arquitectura hexagonal", "Google Pub/Sub", "Google Cloud"],
  },
  {
    slug: "refactorizacion-avance-super-avance",
    title: "Refactorización Avance y Súper Avance",
    summary: "Nuevo flujo de contratación de Avance y Súper Avance con 18 microservicios.",
    role: "Líder Técnico",
    period: "Mar 2026 - Sep 2026",
    client: BANCO_RIPLEY,
    context: CONTEXT,
    description: [
      "Refactorización y modernización del flujo de contratación de Avance y Súper Avance (AvSav).",
      "Se construyó un nuevo flujo compuesto por 18 microservicios en NestJS con arquitectura hexagonal, comunicación síncrona vía gRPC y procesos asíncronos con Pub/Sub, desplegados en GKE.",
    ],
    highlights: [
      "18 microservicios en NestJS con arquitectura hexagonal.",
      "Comunicación gRPC entre servicios y procesos asíncronos con Pub/Sub.",
      "Despliegue en Google Kubernetes Engine (GKE).",
      "Diseño del modelo de base de datos MySQL para el registro de operaciones.",
    ],
    stack: ["NestJS", "Arquitectura hexagonal", "gRPC", "Google Pub/Sub", "GKE", "MySQL"],
  },
  {
    slug: "monitoreo-de-fraude",
    title: "Monitoreo de Fraude",
    summary: "Envío de operaciones de Avance, Súper Avance y Crédito de Consumo al equipo de monitoreo.",
    role: "Desarrollador de Microservicios",
    period: "Dic 2025 - Mar 2026",
    client: BANCO_RIPLEY,
    context: CONTEXT,
    description: [
      "Implementación de modernización que rescata las operaciones de Avance, Súper Avance y Crédito de Consumo y las envía al equipo de monitoreo de fraude (Monitor).",
      "Se construyó con dos servicios en Cloud Run desarrollados en NestJS con arquitectura hexagonal, que se comunican a través de Pub/Sub: un microservicio publisher y otro consumer que envía las operaciones a Monitor.",
      "Se aplicaron patrones de diseño como Strategy, para que cada producto del banco tenga su propio mapeo de datos.",
    ],
    highlights: [
      "Microservicio publisher que rescata y publica las operaciones en Pub/Sub.",
      "Microservicio consumer que procesa los mensajes y los envía a Monitor.",
      "Patrón Strategy: un mapeo de datos único por producto del banco.",
      "Arquitectura hexagonal y orientada a eventos, desplegada en Cloud Run.",
    ],
    stack: ["NestJS", "Arquitectura hexagonal", "Google Pub/Sub", "Cloud Run", "Patrón Strategy"],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function projectHref(slug: string): string {
  return `/proyectos/${slug}`;
}
