import { createTokenizer } from "@solid-primitives/jsx-tokenizer";
import type { MarkerData } from "./marker";
import type { IconData } from "./icon";

export interface TokenType<T extends string> {
  type: T;
}

export type MapTokens = MarkerData;
export const mapTokenizer = createTokenizer<MapTokens>({
  name: "`leaflet-solid` Map Tokenizer",
});

export type LayerTokens = IconData;
export const layerTokenizer = createTokenizer<LayerTokens>({
  name: "`leaflet-solid` Layer Tokenizer",
});
