import { Show, For, createSignal } from "solid-js";
import { Map as LMap, LTileLayer } from "../solid-map";
import type { MapProps as LMapProps } from "../solid-map/map";

import data from "../data/fly-regions.json";

import Attributions from "./Atributions";
import Marker from "./Marker";

export type MapProps = Pick<LMapProps, "el">;

export function Map(prps: MapProps) {
  return (
    <LMap center={[27.5, 12.5]} zoom={3} el={prps.el} zoomSnap={0.5}>
      <LTileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <For each={data}>{(loc) => <Marker {...loc} />}</For>
      <Attributions />
    </LMap>
  );
}

export default function FastMap() {
  const [target, setTarget] = createSignal<HTMLDivElement>();
  return (
    <div ref={setTarget} class="size-screen">
      <Show when={target()}>{(el) => <Map el={el()} />}</Show>
    </div>
  );
}
