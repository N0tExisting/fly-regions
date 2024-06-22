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
  //children,
} from "solid-js";
import {
  //type LatLng,
  type IconOptions as LIconOptions,
  type DivIconOptions as LDivIconOptions,
  DivIcon as LDivIcon,
  Icon as LIcon,
} from "leaflet";
import { trackDeep } from "@solid-primitives/deep";
import { type TokenType, layerTokenizer } from "./tokens";
import { switchClassName, type SwitchClassName } from "./utils/className";

export type ImgIcon = LIcon<LIconOptions>;
export type DisplayIcon = ImgIcon | LDivIcon;

export interface IconData extends TokenType<"icon"> {
  props: IconProps;
  icon: DisplayIcon;
}

export type ForceNever<T, K extends keyof T> = Omit<T, K> &
  Partial<Record<K, never>>;

export type ImgIconOptions = LIconOptions & {
  children?: never;
};
export type ImgIconProps = SwitchClassName<ImgIconOptions>;

export type DivIconOptions = ForceNever<
  LDivIconOptions,
  "iconRetinaUrl" | "iconUrl" | "html"
>;
export type DivIconProps = FlowProps<SwitchClassName<DivIconOptions>>;

export type IconProps = DivIconProps | ImgIconProps;

export const Icon = createToken<IconProps, IconData>(
  layerTokenizer as JSXTokenizer<IconData>,
  (props: IconProps) => {
    const icon = props.children
      ? createDivIcon(props)
      : createImageIcon(props as ImgIconProps);

    onCleanup(() => icon.remove);

    return {
      type: "icon",
      props,
      icon,
    };
  },
  (props) => props.children ?? <img src={props.iconUrl} />
);

function createImageIcon(props: ImgIconProps): ImgIcon {
  const opts = switchClassName<ImgIconOptions>(props);
  const icon = new LIcon(opts);

  createRenderEffect(() => (icon.options = trackDeep(opts)));

  return icon;
}
function createDivIcon(props: DivIconProps): LDivIcon {
  const opts = switchClassName<DivIconOptions>(
    splitProps(props, ["children"])[1]
  );

  const withHtml = mergeProps(opts, {
    html: (
      <div class="size-full m-0! p-0!">{props.children}</div>
    ) as HTMLDivElement,
  });

  const icon = new LDivIcon(withHtml);

  createRenderEffect(() => (icon.options = trackDeep(withHtml)));

  return icon;
}
