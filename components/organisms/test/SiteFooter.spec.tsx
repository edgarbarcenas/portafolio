import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SiteFooter from "../SiteFooter";

describe("SiteFooter", () => {
  it("renders the Figma credits and tagline inside a contentinfo landmark", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");
    expect(footer.textContent).toContain("Desarrollado por Edgar Code");
    expect(footer.textContent).toContain("Todos los derechos reservados.");
    const link = screen.getByRole("link", { name: /Brusacrea/ });
    expect(link.getAttribute("href")).toBe("https://brusacrea.com");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(footer.textContent).toContain("Desarrollador Full Stack | Angular | NestJS | Next.js | React | Google Cloud Platform");
  });
});
