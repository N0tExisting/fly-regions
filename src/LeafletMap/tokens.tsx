import { createTokenizer } from "@solid-primitives/jsx-tokenizer";
import type { TileLayerData } from "./tile-layer";
import type { MarkerData } from "./marker";
import type { IconData } from "./icon";
import type { TooltipData } from "./tooltip";

export interface TokenType<T extends string> {
  type: T;
}

export type MapTokens = MarkerData | TileLayerData;
export const mapTokenizer = createTokenizer<MapTokens>({
  name: "`leaflet-solid` Map Tokenizer",
});

export type LayerTokens = IconData | TooltipData;
export const layerTokenizer = createTokenizer<LayerTokens>({
  name: "`leaflet-solid` Layer Tokenizer",
});
