import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TechLogo from "../TechLogo";

const isShown = (el: HTMLElement) => el.className.includes("opacity-100");

describe("TechLogo", () => {
  it("links the tooltip to its logo and keeps it hidden at rest", () => {
    render(<TechLogo src="/figma/inicio/logo-angular.svg" name="Angular" height={100} />);
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    const trigger = screen.getByAltText("Angular").parentElement as HTMLElement;

    expect(tooltip.textContent).toBe("Angular");
    expect(trigger.getAttribute("aria-describedby")).toBe(tooltip.id);
    expect(isShown(tooltip)).toBe(false);
  });

  it("shows on mouse hover and hides on leave", async () => {
    const user = userEvent.setup();
    render(<TechLogo src="/figma/inicio/logo-nestjs.svg" name="NestJS" height={96} />);
    const trigger = screen.getByAltText("NestJS").parentElement as HTMLElement;
    const tooltip = screen.getByRole("tooltip", { hidden: true });

    await user.hover(trigger);
    expect(isShown(tooltip)).toBe(true);
    await user.unhover(trigger);
    expect(isShown(tooltip)).toBe(false);
  });

  it("shows on keyboard focus and Escape dismisses it", async () => {
    const user = userEvent.setup();
    render(<TechLogo src="/figma/inicio/logo-prisma.svg" name="Prisma" height={100} />);
    const tooltip = screen.getByRole("tooltip", { hidden: true });

    await user.tab();
    expect(isShown(tooltip)).toBe(true);
    await user.keyboard("{Escape}");
    expect(isShown(tooltip)).toBe(false);
  });
});
