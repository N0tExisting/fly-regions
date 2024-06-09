import { For, createSignal } from "solid-js";
import { LMap, LTileLayer } from "../solid-map";

import data from "../data/fly-regions.json";

import Attributions from "./Atributions";
import Marker from "./Marker";

export default function Map() {
  const [target, setTarget] = createSignal<HTMLDivElement>();
  return (
    <div ref={setTarget} class="size-screen">
      <LMap center={[27.5, 12.5]} zoom={3} el={target()}>
        <LTileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <For each={data}>{(loc) => <Marker loc={loc} />}</For>
        <Attributions />
      </LMap>
    </div>
  );
}
