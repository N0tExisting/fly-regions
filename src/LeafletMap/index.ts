import { lazy } from "solid-js";

function forLazy<M, K extends keyof M>(
  imp: Promise<M>,
  name: K
): Promise<{ default: M[K] }> {
  return imp.then((mod) => ({ default: mod[name] }));
}

export const LMap = lazy(() => forLazy(import("./map"), "SolidLeafletMap"));

export const LTileLayer = lazy(() =>
  forLazy(import("./tile-layer"), "TileLayer")
);

export const LMarker = lazy(() => forLazy(import("./marker"), "Marker"));
export const LTooltip = lazy(() => forLazy(import("./tooltip"), "Tooltip"));
export const LIcon = lazy(() => forLazy(import("./icon"), "Icon"));
