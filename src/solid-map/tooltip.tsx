import {
  type JSXTokenizer,
  createToken,
} from "@solid-primitives/jsx-tokenizer";
import {
  type FlowProps,
  splitProps,
  //mergeProps,
  children,
  onCleanup,
  createRenderEffect,
} from "solid-js";
import {
  //type LatLngExpression,
  Tooltip as LTooltip,
  type TooltipOptions as LTooltipOptions,
} from "leaflet";
import { trackDeep } from "@solid-primitives/deep";
import { type TokenType, layerTokenizer } from "./tokens";
import { type SwitchClassName, switchClassName } from "./utils/className";

export interface TooltipData extends TokenType<"tooltip"> {
  tooltip: LTooltip;
  props: TooltipProps;
}

export type TooltipOpts = Omit<LTooltipOptions, "content">;
export type TooltipProps = FlowProps<SwitchClassName<TooltipOpts>>;

export const Tooltip = createToken<TooltipProps, TooltipData>(
  layerTokenizer as JSXTokenizer<TooltipData>,
  (props) => {
    const opts = switchClassName<TooltipOpts>(
      splitProps(props, ["children"])[1]
    );

    const tooltip = new LTooltip(opts);

    const content = children(() => props.children);
    createRenderEffect(() =>
      tooltip.setContent((<>{content()}</>) as HTMLElement)
    );
    createRenderEffect(
      () => props.opacity && tooltip.setOpacity(props.opacity)
    );
    // TODO: Only track what isn't being set automatically
    createRenderEffect(() => {
      tooltip.options = trackDeep(opts);
      tooltip.update();
    });
    onCleanup(() => tooltip.remove);

    return {
      type: "tooltip",
      tooltip,
      props,
    };
  },
  (p) => <div class={p.class}>{p.children}</div>
);
