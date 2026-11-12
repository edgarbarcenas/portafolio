import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Estrella from "../Estrella";

// test.globals is disabled, so Testing Library's auto-cleanup never
// registers without this call.
afterEach(cleanup);

function starLayer(root: HTMLElement) {
  const star = root.querySelector<HTMLImageElement>("img[src='/figma/bio/star/star.svg']");
  return star?.parentElement ?? null;
}

describe("Estrella", () => {
  it("rotates the star layer on hover and reverts on leave", async () => {
    const user = userEvent.setup();
    render(<Estrella />);

    const root = screen.getByRole("img", { name: "Estrella decorativa con el rostro de Edgar" });
    const layer = starLayer(root);
    expect(layer?.style.transform).toBe("rotate(0deg)");

    await user.hover(root);
    expect(layer?.style.transform).toBe("rotate(27.68deg)");

    await user.unhover(root);
    expect(layer?.style.transform).toBe("rotate(0deg)");
  });

  it("treats focus the same as hover", () => {
    render(<Estrella />);

    const root = screen.getByRole("img", { name: "Estrella decorativa con el rostro de Edgar" });
    const layer = starLayer(root);

    fireEvent.focus(root);
    expect(layer?.style.transform).toBe("rotate(27.68deg)");

    fireEvent.blur(root);
    expect(layer?.style.transform).toBe("rotate(0deg)");
  });

  it("toggles on tap/click for touch, without a hover event", () => {
    render(<Estrella />);

    const root = screen.getByRole("img", { name: "Estrella decorativa con el rostro de Edgar" });
    const layer = starLayer(root);

    // Closest jsdom approximation of a touch tap: plain `click`, no hover.
    fireEvent.click(root);
    expect(layer?.style.transform).toBe("rotate(27.68deg)");

    fireEvent.click(root);
    expect(layer?.style.transform).toBe("rotate(0deg)");
  });
});
