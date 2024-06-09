import "leaflet/dist/leaflet.css";
import {
  Map as LMap,
  type TileLayer as LTileLayer,
  type MapOptions as LMapOptions,
} from "leaflet";

import {
  type FlowProps,
  type FlowComponent,
  splitProps,
  createRenderEffect,
  mapArray,
  onCleanup,
} from "solid-js";
import { resolveTokens } from "@solid-primitives/jsx-tokenizer";
import { createSubRoot } from "@solid-primitives/rootless";
import { trackDeep } from "@solid-primitives/deep";

import { mapTokenizer } from "./tokens";
import { type LAttribution } from "./attribution";

export interface MapProps extends FlowProps<LMapOptions> {
  el: HTMLElement;
}

export const Map: FlowComponent<MapProps> = (props: MapProps) => {
  const [, opts] = splitProps(props, ["children", "el"]);
  const map = new LMap(props.el, opts);

  const tokens = resolveTokens(mapTokenizer, () => props.children);

  let tile: LTileLayer | undefined;
  let attribution: LAttribution | undefined;
  mapArray(tokens, ({ data }) => {
    switch (data.type) {
      case "tile-layer":
        if (tile) throw new Error("You already have a TileLayer in the map");
        createSubRoot((yeet) => {
          data.tiles.addTo(map);
          tile = data.tiles;
          onCleanup(() => (tile = undefined));
          data.tiles.addOneTimeEventListener("remove", yeet);
        });
        break;
      case "attribution":
        if (attribution)
          throw new Error("You already have an Attribution in the map");
        createSubRoot((yeet) => {
          data.attribution.addTo(map);
          attribution = data.attribution;
          onCleanup(() => (attribution = undefined));
          data.attribution.addOneTimeEventListener("remove", yeet);
        });
        break;
      case "marker":
        data.marker.addTo(map);
        break;
    }
  });

  createRenderEffect(() => opts.zoom && map.setZoom(opts.zoom));
  createRenderEffect(() => opts.minZoom && map.setMinZoom(opts.minZoom));
  createRenderEffect(() => opts.maxZoom && map.setMaxZoom(opts.maxZoom));
  createRenderEffect(() => opts.center && map.setView(opts.center));
  createRenderEffect(() => (map.options = trackDeep(opts)));

  onCleanup(map.remove);

  return null;
};
