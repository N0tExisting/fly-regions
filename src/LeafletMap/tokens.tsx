import { createTokenizer } from "@solid-primitives/jsx-tokenizer";
import type { MarkerData } from "./marker";
import type { IconData } from "./icon";
import type { TooltipData } from "./tooltip";

export type SwitchClassName<T extends { className?: string }> = Omit<
  T,
  "className"
> & { class?: T["className"] };

export interface TokenType<T extends string> {
  type: T;
}

export type MapTokens = MarkerData;
export const mapTokenizer = createTokenizer<MapTokens>({
  name: "`leaflet-solid` Map Tokenizer",
});

export type LayerTokens = IconData | TooltipData;
export const layerTokenizer = createTokenizer<LayerTokens>({
  name: "`leaflet-solid` Layer Tokenizer",
});
