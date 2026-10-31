import { act, cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Emblem } from "./Emblem";

const scene = vi.hoisted(() => ({
  props: undefined as undefined | { onReady: () => void; onError: () => void; reduce: boolean },
  reduce: false,
}));
vi.mock("framer-motion", () => ({ useReducedMotion: () => scene.reduce }));
vi.mock("./Emblem3D", () => ({
  default: (props: typeof scene.props) => {
    scene.props = props;
    return <canvas data-testid="emblem-canvas" />;
  },
}));

beforeEach(() => {
  scene.props = undefined;
  scene.reduce = false;
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => ({
    isContextLost: () => false,
    getExtension: () => null,
  }) as unknown as WebGLRenderingContext);
  vi.spyOn(navigator, "hardwareConcurrency", "get").mockReturnValue(8);
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("Emblem startup", () => {
  it("keeps the fallback visible and the canvas hidden until the ready callback", async () => {
    const { container, findByTestId } = render(<Emblem />);
    await findByTestId("emblem-canvas");
    expect(container.querySelector("[data-scene-ready]")).toBeNull();
    act(() => scene.props?.onReady());
    expect(container.querySelector("[data-scene-ready]")).not.toBeNull();
  });

  it("returns to fallback on context failure and ignores a late ready callback", async () => {
    const { container, queryByTestId } = render(<Emblem />);
    await waitFor(() => expect(scene.props).toBeDefined());
    const callbacks = scene.props;
    act(() => callbacks?.onReady());
    act(() => callbacks?.onError());
    act(() => callbacks?.onReady());
    expect(queryByTestId("emblem-canvas")).toBeNull();
    expect(container.querySelector("[data-scene-ready]")).toBeNull();
  });

  it("does not mount a canvas on low-power devices", () => {
    vi.spyOn(navigator, "hardwareConcurrency", "get").mockReturnValue(2);
    const { queryByTestId } = render(<Emblem />);
    expect(queryByTestId("emblem-canvas")).toBeNull();
  });

  it("keeps the fallback when WebGL initialization fails", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => { throw new Error("WebGL unavailable"); });
    const { queryByTestId } = render(<Emblem />);
    expect(queryByTestId("emblem-canvas")).toBeNull();
  });

  it("passes reduced-motion preference to the scene", async () => {
    scene.reduce = true;
    render(<Emblem />);
    await waitFor(() => expect(scene.props?.reduce).toBe(true));
  });
});