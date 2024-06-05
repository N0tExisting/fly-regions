import { trackDeep } from "@solid-primitives/deep";
import { createToken, resolveTokens } from "@solid-primitives/jsx-tokenizer";
import {
  type ParentProps,
  splitProps,
  createRenderEffect,
  mapArray,
} from "solid-js";
import {
  type LatLng,
  type MarkerOptions as LMarkerOptions,
  Marker as LMarker,
} from "leaflet";
import { type TokenType, mapTokenizer, layerTokenizer } from "./tokens";
import type { TooltipData } from "./tooltip";
import type { IconData } from "./icon";

export interface MarkerData extends TokenType<"marker"> {
  props: MarkerProps;
  marker: LMarker;
}

export type MarkerOptsBase = Omit<LMarkerOptions, "icon" | "attribution">;
export type MarkerOptsDraggable = Omit<MarkerOptsBase, "draggable"> & {
  draggable: true;
};
export type MarkerOptDrag = Pick<MarkerOptsBase, "draggable">;
export type MarkerOptDraggless = MarkerOptDrag extends { draggable: true }
  ? never
  : MarkerOptDrag;
export type MarkerOptsDraggless = Omit<
  MarkerOptsBase,
  "draggable" | "autoPan" | "autoPanPadding" | "autoPanSpeed"
> &
  MarkerOptDraggless;
export type MarkerOptions = MarkerOptsDraggable | MarkerOptsDraggless;

export type MarkerProps = ParentProps<MarkerOptions> & {
  pos: LatLng;
};
export const Marker = createToken(
  mapTokenizer,
  (props: MarkerProps) => {
    const [content, info, markerOpts] = splitProps(
      props,
      ["children"],
      ["pos"]
    );

    const marker = new LMarker(info.pos, markerOpts);

    createRenderEffect(() => marker.setLatLng(info.pos));
    createRenderEffect(() => {
      if (markerOpts.opacity) marker.setOpacity(markerOpts.opacity);
    });
    createRenderEffect(() => {
      if (markerOpts.zIndexOffset)
        marker.setZIndexOffset(markerOpts.zIndexOffset);
    });
    createRenderEffect(() => (marker.options = trackDeep(markerOpts)));

    const tokens = resolveTokens(layerTokenizer, () => content.children);

    let setIcon = false;
    mapArray(tokens, (token) => {
      switch (token.data.type) {
        case "icon":
          if (setIcon) throw new Error("You Have already provided an Icon");
          createRenderEffect(() =>
            marker.setIcon((token.data as IconData).icon)
          );
          setIcon = true;
          break;
        case "tooltip":
          if (marker.getTooltip())
            throw new Error("You Have already provided a tooltip");
          createRenderEffect(() =>
            marker.bindTooltip((token.data as TooltipData).tooltip)
          );
          break;
      }
    });

    return {
      type: "marker",
      props,
      marker,
    };
  }
  //(p) => p.children
);
