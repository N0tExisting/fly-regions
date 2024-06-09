import { trackDeep } from "@solid-primitives/deep";
import {
  type JSXTokenizer,
  createToken,
  resolveTokens,
} from "@solid-primitives/jsx-tokenizer";
import {
  type ParentProps,
  splitProps,
  createRenderEffect,
  mapArray,
  onCleanup,
} from "solid-js";
import {
  type LatLngExpression,
  type MarkerOptions as LMarkerOptions,
  Marker as LMarker,
} from "leaflet";
import { type TokenType, mapTokenizer, layerTokenizer } from "./tokens";
import { createSubRoot } from "@solid-primitives/rootless";

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
  pos: LatLngExpression;
};
export const Marker = createToken<MarkerProps, MarkerData>(
  mapTokenizer as JSXTokenizer<MarkerData>,
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
    // TODO: Only track what isn't being set automatically
    createRenderEffect(() => (marker.options = trackDeep(markerOpts)));

    const tokens = resolveTokens(layerTokenizer, () => content.children);

    let setIcon = false;
    mapArray(tokens, ({ data }) => {
      switch (data.type) {
        case "icon":
          if (setIcon) throw new Error("You Have already provided an Icon");
          createSubRoot((yeet) => {
            createRenderEffect(() => marker.setIcon(data.icon));

            onCleanup(() => (setIcon = false));

            data.icon.addOneTimeEventListener("remove", yeet);

            setIcon = true;
          });
          break;
        case "tooltip":
          if (marker.getTooltip())
            throw new Error("You Have already provided a tooltip");
          createRenderEffect(() => marker.bindTooltip(data.tooltip));
          break;
      }
    });

    onCleanup(marker.remove);

    return {
      type: "marker",
      props,
      marker,
    };
  }
  //(p) => p.children
);
