import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SiteFooter from "./SiteFooter";

describe("SiteFooter", () => {
  it("renders the Figma credits and tagline inside a contentinfo landmark", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");
    expect(footer.textContent).toContain("Desarrollado por Edgar Code");
    expect(footer.textContent).toContain("Diseñado por Brusacrea. Todos los derechos reservados.");
    expect(footer.textContent).toContain("Desarrollador Full Stack | Next.js | Angular | NestJS | Prisma | Supabase");
  });
});
