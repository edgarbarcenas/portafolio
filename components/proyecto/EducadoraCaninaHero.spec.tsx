import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import EducadoraCaninaHero from "./EducadoraCaninaHero";

// No global test setup file configures RTL auto-cleanup; do it locally so
// each test starts from an empty document.
afterEach(cleanup);

// jsdom has no ResizeObserver; components/common/ScaleToFit.tsx (shared,
// not owned by this task) needs one. Stub it for this spec only.
beforeAll(() => {
  if (!("ResizeObserver" in globalThis)) {
    class ResizeObserverStub {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    (globalThis as typeof globalThis & { ResizeObserver: typeof ResizeObserverStub }).ResizeObserver =
      ResizeObserverStub;
  }
});

describe("EducadoraCaninaHero", () => {
  it("renders the project name as an accessible, visually hidden heading", () => {
    render(<EducadoraCaninaHero />);

    const heading = screen.getByRole("heading", { level: 1, name: "Educadora Canina" });
    expect(heading.textContent).toBe("Educadora Canina");
  });

  it("renders the web and mobile mockups with descriptive alt text (phone + desktop layouts)", () => {
    render(<EducadoraCaninaHero />);

    // One copy per layout; CSS shows only the one for the current width.
    expect(
      screen.getAllByAltText("Mockup de escritorio de Educadora Canina: página Clase en Sede con agenda"),
    ).toHaveLength(2);
    expect(screen.getAllByAltText("Mockup móvil de Educadora Canina: agenda de citas")).toHaveLength(2);
  });
});
