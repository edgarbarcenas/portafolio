// Proposed routes from the Figma handoff note; not published URLs.
export const ROUTES = {
  home: "/",
  cv: "/cv",
  educadoraCanina: "/proyectos/educadora-canina",
} as const;

// Section anchors on the home page (Figma screen 01).
export const SECTIONS = {
  hero: "inicio",
  experiencia: "experiencia",
  proyectos: "proyectos",
  habilidades: "habilidades",
  contacto: "contacto",
} as const;

export type SectionId = (typeof SECTIONS)[keyof typeof SECTIONS];
