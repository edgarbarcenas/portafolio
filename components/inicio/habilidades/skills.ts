import type { SkillIconKey } from "./icon-layers";

// rating: stars out of 5 (defaults to 5).
export type SkillRow = { icon: SkillIconKey; label: string; rating?: number };
export type SkillCategory = { title: string; rows: SkillRow[] };

// Card order and content from the Figma handoff, edited by the developer on
// 2026-11-12: "Herramientas & Librerías" removed, Cloud Run replaced by
// Google Cloud Platform, PHP/Java/Spring Boot rated 3 stars.
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    rows: [
      { icon: "react", label: "React" },
      { icon: "nextjs", label: "Next JS" },
      { icon: "angular", label: "Angular" },
      { icon: "react-native", label: "React Native" },
      { icon: "tailwindcss", label: "TailwindCSS" },
      { icon: "shadcn", label: "Shadcn" },
    ],
  },
  {
    title: "Backend",
    rows: [
      { icon: "nextjs", label: "Next JS" },
      { icon: "nodejs", label: "Node.js" },
      { icon: "spring-boot", label: "Spring Boot", rating: 3 },
      { icon: "php", label: "PHP", rating: 3 },
      { icon: "java", label: "Java", rating: 3 },
    ],
  },
  {
    title: "Bases de Datos",
    rows: [
      { icon: "mysql", label: "MySQL" },
      { icon: "mongodb", label: "MongoDB" },
      { icon: "prisma", label: "Prisma" },
      { icon: "supabase", label: "Supabase" },
    ],
  },
  {
    title: "DevOps & Deploy",
    rows: [
      { icon: "docker", label: "Docker" },
      { icon: "vercel", label: "Vercel" },
      { icon: "google-cloud", label: "Google Cloud Platform" },
    ],
  },
];
