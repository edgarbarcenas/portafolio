import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Habilidades from "../Habilidades";

// "label:stars" for every row of one card, read from the rendered DOM.
function rowsOf(title: string): string[] {
  const card = screen.getByRole("heading", { level: 3, name: title }).closest("article");
  return within(card as HTMLElement)
    .getAllByRole("listitem")
    .map((li) => {
      const label = li.textContent?.replace(/, \d de 5 estrellas$/, "") ?? "";
      const stars = li.querySelectorAll('img[src="/figma/inicio/rating-star.svg"]').length;
      return `${label}:${stars}`;
    });
}

describe("Habilidades", () => {
  it("renders the six category cards, in order", () => {
    render(<Habilidades />);

    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "Arquitectura",
      "Backend",
      "Frontend",
      "Bases de Datos",
      "Cloud & DevOps",
      "Herramientas",
    ]);
    expect(screen.queryByText("DevOps & Deploy")).toBeNull();
    expect(screen.queryByText("Testing & Herramientas")).toBeNull();
  });

  it("lists each card's skills in order with their star ratings", () => {
    render(<Habilidades />);

    expect(rowsOf("Arquitectura")).toEqual([
      "Microservicios:5", "Arquitectura hexagonal:5", "Event-Driven:5", "gRPC:4", "Multi-tenant:4",
    ]);
    expect(rowsOf("Backend")).toEqual(["NestJS:5", "Node.js:4", "Spring Boot:3", "Java:3", "PHP:3"]);
    expect(rowsOf("Frontend")).toEqual([
      "Angular:5", "React:4", "Next JS:4", "TailwindCSS:4", "Shadcn:4", "React Native:3",
    ]);
    expect(rowsOf("Bases de Datos")).toEqual(["MySQL:5", "Prisma:5", "Supabase:4", "MongoDB:3"]);
    expect(rowsOf("Cloud & DevOps")).toEqual([
      "Google Cloud (GKE, Cloud Run, Pub/Sub):5", "Vercel:5", "Docker:4", "CI/CD:4",
    ]);
    expect(rowsOf("Herramientas")).toEqual([
      "Swagger:5", "Jest:4", "JWT / Passport:4", "Firebase:4", "FullCalendar:4", "Redux Toolkit:3",
    ]);
  });

  it("announces each rating as text for screen readers", () => {
    const { container } = render(<Habilidades />);

    for (const item of container.querySelectorAll("article li")) {
      const stars = item.querySelectorAll('img[src="/figma/inicio/rating-star.svg"]').length;
      expect(item.textContent).toContain(`${stars} de 5 estrellas`);
    }
  });
});
