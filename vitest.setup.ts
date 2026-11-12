import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// No vitest globals, so Testing Library cannot register its own cleanup.
afterEach(cleanup);

// jsdom has no ResizeObserver; components/common/ScaleToFit needs one.
if (!("ResizeObserver" in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
