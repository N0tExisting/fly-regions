import {
  type JSXTokenizer,
  createToken,
} from "@solid-primitives/jsx-tokenizer";
import {
  type FlowProps,
  splitProps,
  createRenderEffect,
  mergeProps,
  onCleanup,
  createMemo,
  children,
} from "solid-js";
import {
  //type LatLng,
  Tooltip as LTooltip,
  type TooltipOptions as LTooltipOptions,
} from "leaflet";
import { trackDeep } from "@solid-primitives/deep";
import { type TokenType, layerTokenizer, SwitchClassName } from "./tokens";

export interface TooltipData extends TokenType<"tooltip"> {
  tooltip: LTooltip;
  props: TooltipProps;
}

export type TooltipProps = FlowProps<SwitchClassName<LTooltipOptions>>;

export const Tooltip = createToken<TooltipProps, TooltipData>(
  layerTokenizer as JSXTokenizer<TooltipData>,
  (props) => {
    const [, cOpts, hOpts] = splitProps(props, ["children"], ["class"]);
    const opts = mergeProps(hOpts, {
      get className() {
        return cOpts.class;
      },
    });
    const tooltip = new LTooltip(opts);

    const childs = children(() => props.children);
    const content = createMemo(() => (<>{childs()}</>) as HTMLElement);
    createRenderEffect(() => tooltip.setContent(content()));
    createRenderEffect(
      () => props.opacity && tooltip.setOpacity(props.opacity)
    );
    createRenderEffect(() => {
      tooltip.options = trackDeep(opts);
      tooltip.update();
    });
    onCleanup(() => tooltip.remove());

    return {
      type: "tooltip",
      tooltip,
      props,
    };
  },
  (p) => <div class={p.class}>{p.children}</div>
);
