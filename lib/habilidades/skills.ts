import type { SkillIconKey } from "./icon-layers";

// rating: stars out of 5 (defaults to 5).
export type SkillRow = { icon: SkillIconKey; label: string; rating?: number };
export type SkillCategory = { title: string; rows: SkillRow[] };

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Arquitectura",
    rows: [
      { icon: "microservicios", label: "Microservicios", rating: 5 },
      { icon: "hexagonal", label: "Arquitectura hexagonal", rating: 5 },
      { icon: "event-driven", label: "Event-Driven", rating: 5 },
      { icon: "grpc", label: "gRPC", rating: 4 },
      { icon: "multi-tenant", label: "Multi-tenant", rating: 4 },
    ],
  },
  {
    title: "Backend",
    rows: [
      { icon: "nodejs", label: "Node.js", rating: 4 },
      { icon: "nestjs", label: "NestJS", rating: 5 },
      { icon: "php", label: "PHP", rating: 3 },
      { icon: "java", label: "Java", rating: 3 },
      { icon: "spring-boot", label: "Spring Boot", rating: 3 },
    ],
  },
  {
    title: "Frontend",
    rows: [
      { icon: "angular", label: "Angular", rating: 5 },
      { icon: "react", label: "React", rating: 4 },
      { icon: "nextjs", label: "Next JS", rating: 4 },
      { icon: "react-native", label: "React Native", rating: 3 },
      { icon: "tailwindcss", label: "TailwindCSS", rating: 4 },
      { icon: "shadcn", label: "Shadcn", rating: 4 },
    ],
  },
  {
    title: "Bases de Datos",
    rows: [
      { icon: "mysql", label: "MySQL", rating: 5 },
      { icon: "prisma", label: "Prisma", rating: 5 },
      { icon: "postgresql", label: "PostgreSQL", rating: 4 },
      { icon: "supabase", label: "Supabase", rating: 4 },
      { icon: "firebase", label: "Firebase", rating: 4 },
      { icon: "mongodb", label: "MongoDB", rating: 3 },
    ],
  },
  {
    title: "Cloud & DevOps",
    rows: [
      { icon: "google-cloud", label: "Google Cloud (Cloud Run, GKE, Pub/Sub, Apigee, Firestore)", rating: 5 },
      { icon: "vercel", label: "Vercel", rating: 5 },
      { icon: "docker", label: "Docker", rating: 4 },
      { icon: "ci-cd", label: "CI/CD", rating: 4 },
    ],
  },
  {
    title: "Herramientas",
    rows: [
      { icon: "swagger", label: "Swagger", rating: 5 },
      { icon: "jest", label: "Jest", rating: 4 },
      { icon: "jwt", label: "JWT / Passport", rating: 4 },
      { icon: "fullcalendar", label: "FullCalendar", rating: 4 },
      { icon: "redux", label: "Redux Toolkit", rating: 3 },
    ],
  },
];
