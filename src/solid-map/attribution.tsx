import {
  type JSXTokenizer,
  createToken,
} from "@solid-primitives/jsx-tokenizer";
import {
  type FlowProps,
  splitProps,
  mergeProps,
  children,
  onCleanup,
  createRenderEffect,
  createSignal,
  type JSX,
} from "solid-js";
import { Portal, Show } from "solid-js/web";
import { Control, Map } from "leaflet";
import { type TokenType, mapTokenizer } from "./tokens";

export type AttributionOptions = Omit<Control.AttributionOptions, "prefix">;
export type SlimAttribution = Omit<
  Control.Attribution,
  "addAttribution" | "removeAttribution" | "setPrefix"
>;
export class LAttribution extends Control.Attribution {
  #signal = createSignal<HTMLElement>();
  #removeHandlers = new Set<() => void>();
  get el() {
    return this.#signal[0]();
  }
  constructor(opts: AttributionOptions = {}) {
    super(mergeProps(opts, { prefix: false }));
  }
  override onAdd(map: Map): HTMLElement {
    const el = super.onAdd!(map);
    this.#signal[1](el);
    // Remove the event listeners
    super.onRemove!(map);
    return el;
  }
  addOneTimeEventListener(_event: "remove", handler: () => void): this {
    this.#removeHandlers.add(handler);
    return this;
  }
  //? We need an event handler for unmounting the control
  remove(): this {
    this.#removeHandlers.forEach((handle) => handle());
    this.#removeHandlers.clear();
    this.#signal[1](undefined);
    return super.remove();
  }
  // skip calling the super's `onRemove` beacause we already did it in the `onAdd`
  override onRemove() {}
  override addAttribution() {
    return this;
  }
  override removeAttribution() {
    return this;
  }
  override setPrefix() {
    return this;
  }
}

export interface AttributionData extends TokenType<"attribution"> {
  attribution: LAttribution;
  props: AttributionProps;
  content: JSX.Element;
}
export type AttributionProps = FlowProps<AttributionOptions>;

export const Attribution = createToken<AttributionProps, AttributionData>(
  mapTokenizer as JSXTokenizer<AttributionData>,
  (props) => {
    const [, opts] = splitProps(props, ["children"]);
    const attribution = new LAttribution(opts);

    createRenderEffect(
      () => opts.position && attribution.setPosition(opts.position)
    );
    onCleanup(attribution.remove);

    const kids = children(() => props.children);

    const content = (
      <Show when={attribution.el}>
        {(el) => <Portal mount={el()}>{kids()}</Portal>}
      </Show>
    );

    return {
      type: "attribution",
      attribution,
      content,
      props,
    };
  },
  (props) => (
    <div class="leaflet-control-attribution">
      <div>{props.children}</div>
    </div>
  )
);
