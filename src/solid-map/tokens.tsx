import { createTokenizer } from "@solid-primitives/jsx-tokenizer";

import type { AttributionData } from "./attribution";
import type { TileLayerData } from "./tile-layer";
import type { MarkerData } from "./marker";

import type { TooltipData } from "./tooltip";
import type { IconData } from "./icon";

export interface TokenType<T extends string> {
  type: T;
}

export type MapTokens = MarkerData | TileLayerData | AttributionData;
export const mapTokenizer = createTokenizer<MapTokens>({
  name: "`leaflet-solid` Map Tokenizer",
});

export type LayerTokens = IconData | TooltipData;
export const layerTokenizer = createTokenizer<LayerTokens>({
  name: "`leaflet-solid` Layer Tokenizer",
});
