import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import IntroOverlay from "../IntroOverlay";
import { INTRO_SEEN_KEY } from "@/lib/intro-session";

// prefers-reduced-motion is mocked "true" so exit() resolves synchronously,
// without needing fake timers for the 1500ms dissolve.
function mockMatchMedia(reduced: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduced,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

describe("IntroOverlay", () => {
  beforeEach(() => {
    mockMatchMedia(true);
    document.documentElement.dataset.intro = "show";
    document.body.insertAdjacentHTML("beforeend", '<main><section id="inicio"></section></main>');
    sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
    delete document.documentElement.dataset.intro;
    document.body.innerHTML = "";
  });

  it("renders nothing when the pre-paint script did not ask to show it", () => {
    document.documentElement.dataset.intro = "skip";
    render(<IntroOverlay />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("the Scroll button exits: marks the intro seen and unmounts the overlay", () => {
    render(<IntroOverlay />);
    expect(screen.getByRole("dialog", { name: "Introducción" })).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Scroll — entrar al portafolio" }));

    expect(sessionStorage.getItem(INTRO_SEEN_KEY)).toBe("1");
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
