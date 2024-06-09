import { lazy, Show } from "solid-js";
import type { MapProps } from "./map";

function forLazy<M, K extends keyof M>(
  imp: Promise<M>,
  name: K
): Promise<{ default: M[K] }> {
  return imp.then((mod) => ({ default: mod[name] }));
}

const Map = lazy(() => forLazy(import("./map"), "Map"));
export interface LMapProps extends Omit<MapProps, "el"> {
  el: HTMLElement | undefined;
}
export function LMap(props: LMapProps) {
  Map.preload();
  return <Show when={props.el}>{(el) => <Map {...props} el={el()} />}</Show>;
}

export const LAttribution = lazy(() =>
  forLazy(import("./attribution"), "Attribution")
);
export const LTileLayer = lazy(() =>
  forLazy(import("./tile-layer"), "TileLayer")
);

export const LMarker = lazy(() => forLazy(import("./marker"), "Marker"));
export const LTooltip = lazy(() => forLazy(import("./tooltip"), "Tooltip"));
export const LIcon = lazy(() => forLazy(import("./icon"), "Icon"));
