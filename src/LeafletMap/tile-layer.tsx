import {
  type JSXTokenizer,
  createToken,
} from "@solid-primitives/jsx-tokenizer";
import { splitProps, createRenderEffect, onCleanup } from "solid-js";
import {
  TileLayer as LTileLayer,
  TileLayerOptions as LTileLayerOpts,
} from "leaflet";
import { trackDeep } from "@solid-primitives/deep";
import { type TokenType, mapTokenizer } from "./tokens";
import { type SwitchClassName, switchClassName } from "./utils/className";

export interface TileLayerData extends TokenType<"tile-layer"> {
  props: TileLayerProps;
  tiles: LTileLayer;
}

export type TileLayerOpts = Omit<LTileLayerOpts, "attribution">;

export interface TileLayerProps extends SwitchClassName<TileLayerOpts> {
  url: string;
}

export const TileLayer = createToken<TileLayerProps, TileLayerData>(
  mapTokenizer as JSXTokenizer<TileLayerData>,
  (props) => {
    const opts = switchClassName<TileLayerOpts>(splitProps(props, ["url"])[1]);
    const tiles = new LTileLayer(props.url, opts);

    createRenderEffect(() => tiles.setUrl(props.url));
    createRenderEffect(() => {
      tiles.options = trackDeep(opts);
      tiles.redraw();
    });
    onCleanup(tiles.remove);

    return {
      type: "tile-layer",
      props,
      tiles,
    };
  }
);
