import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Habilidades from "./Habilidades";

describe("Habilidades", () => {
  it("renders the four category cards, in order (no Herramientas & Librerías)", () => {
    render(<Habilidades />);

    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "Frontend",
      "Backend",
      "Bases de Datos",
      "DevOps & Deploy",
    ]);
  });

  it("DevOps lists Docker, Vercel and Google Cloud Platform (no Cloud Run)", () => {
    render(<Habilidades />);

    const card = screen.getByRole("heading", { level: 3, name: "DevOps & Deploy" }).closest("article");
    const items = within(card as HTMLElement).getAllByRole("listitem");
    expect(items.map((li) => li.textContent?.split(",")[0])).toEqual([
      "Docker",
      "Vercel",
      "Google Cloud Platform",
    ]);
    expect(screen.queryByText(/Cloud Run/)).toBeNull();
  });

  it("rates PHP, Java and Spring Boot with 3 stars and the rest with 5", () => {
    const { container } = render(<Habilidades />);
    const rows = [...container.querySelectorAll("article li")];
    expect(rows).toHaveLength(18);

    for (const item of rows) {
      const label = item.textContent?.split(",")[0] ?? "";
      const stars = item.querySelectorAll('img[src="/figma/inicio/rating-star.svg"]').length;
      const expected = ["PHP", "Java", "Spring Boot"].includes(label) ? 3 : 5;
      expect(stars, label).toBe(expected);
      expect(item.textContent).toContain(`${expected} de 5 estrellas`);
    }
  });
});
