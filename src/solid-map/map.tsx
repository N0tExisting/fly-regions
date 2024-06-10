import "leaflet/dist/leaflet.css";
import {
  Map as LMap,
  type TileLayer as LTileLayer,
  type MapOptions as LMapOptions,
  Util,
} from "leaflet";

import {
  type FlowProps,
  type FlowComponent,
  splitProps,
  createRenderEffect,
  mapArray,
  onCleanup,
  on,
} from "solid-js";
import { resolveTokens } from "@solid-primitives/jsx-tokenizer";
import { createSubRoot } from "@solid-primitives/rootless";
import { trackDeep } from "@solid-primitives/deep";

import { mapTokenizer } from "./tokens";
import { type LAttribution } from "./attribution";

export interface MapProps extends FlowProps<LMapOptions> {
  el: HTMLElement;
}

/*function setOpts<T>(obj: { options: T }, opts: T) {
  return () => (obj.options = Util.setOptions(obj, opts) as T);
}*/

export const Map: FlowComponent<MapProps> = (props: MapProps) => {
  const [, opts] = splitProps(props, ["children", "el"]);
  const map = new LMap(props.el);
  map.options = Util.setOptions(map, opts);
  const [view, trackedOpts] = splitProps(opts, [
    "center",
    "zoom",
    "minZoom",
    "maxZoom",
    "maxBounds",
  ]);
  createRenderEffect(
    on(
      () => trackDeep(trackedOpts),
      // TODO: Refresh the map ?
      () => map
    )
  );
  createRenderEffect(() => view.zoom && map.setZoom(view.zoom));
  createRenderEffect(() => view.minZoom && map.setMinZoom(view.minZoom));
  createRenderEffect(() => view.maxZoom && map.setMaxZoom(view.maxZoom));
  createRenderEffect(() => view.center && map.setView(view.center));
  createRenderEffect(() => view.maxBounds && map.setMaxBounds(view.maxBounds));

  onCleanup(map.remove);

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

  return <div />;
};
