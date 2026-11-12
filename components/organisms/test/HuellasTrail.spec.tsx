import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HuellasTrail from "../HuellasTrail";
import { CFG } from "@/lib/huellas/trail";

describe("HuellasTrail", () => {
  afterEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  it("toggles between Auto and Cursor with a corner pill and remembers it", async () => {
    const user = userEvent.setup();
    render(<HuellasTrail />);

    // jsdom has no fine pointer, so the default is Auto.
    const pill = await screen.findByRole("button", { name: /modo Auto/ });
    expect(pill.textContent).toBe("Auto");
    await user.click(pill);
    expect(screen.getByRole("button", { name: /modo Cursor/ }).textContent).toBe("Cursor");
    expect(localStorage.getItem("huellas-modo")).toBe("cursor");
  });

  it("Auto mode leaves prints that never take pointer events, capped at maxPaws", async () => {
    vi.useFakeTimers();
    const { container } = render(<HuellasTrail />);
    await act(async () => {
      vi.advanceTimersByTime(CFG.autoStepMs * 30);
    });
    const layer = container.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(layer.className).toContain("pointer-events-none");
    expect(layer.children.length).toBeGreaterThan(0);
    expect(layer.children.length).toBeLessThanOrEqual(CFG.maxPaws);
    for (const print of layer.children) {
      expect((print as HTMLElement).style.pointerEvents).toBe("none");
      expect(print.querySelector("img")?.getAttribute("src")).toBe("/figma/common/huellita.svg");
    }
  });

  it("Cursor mode leaves no prints until the pointer moves", async () => {
    vi.useFakeTimers();
    localStorage.setItem("huellas-modo", "cursor");
    const { container } = render(<HuellasTrail />);
    await act(async () => {
      vi.advanceTimersByTime(CFG.followStepMs * 10);
    });
    expect((container.querySelector('[aria-hidden="true"]') as HTMLElement).children.length).toBe(0);
  });
});
