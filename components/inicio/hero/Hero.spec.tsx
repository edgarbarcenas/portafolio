import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";

// Cleanup and the ResizeObserver stub come from vitest.setup.ts.
describe("Hero", () => {
  it("exposes an h1 named 'Edgar Barcenas'", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1, name: "Edgar Barcenas" });
    expect(heading.tagName).toBe("H1");
  });

  it("toggles the banner's active state on hover and reverts on leave", async () => {
    const user = userEvent.setup();
    render(<Hero />);
    const banner = screen.getByRole("img", { name: "Composición decorativa" });

    expect(banner.getAttribute("data-state")).toBe("default");

    await user.hover(banner);
    expect(banner.getAttribute("data-state")).toBe("active");

    await user.unhover(banner);
    expect(banner.getAttribute("data-state")).toBe("default");
  });

  it("toggles the banner's active state on focus and reverts on blur", async () => {
    const user = userEvent.setup();
    render(<Hero />);
    const banner = screen.getByRole("img", { name: "Composición decorativa" });

    await user.tab();
    expect(banner.getAttribute("data-state")).toBe("active");

    await user.tab();
    expect(banner.getAttribute("data-state")).toBe("default");
  });
});
