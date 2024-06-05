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
import { type TokenType, type SwitchClassName, layerTokenizer } from "./tokens";

export type ImgIcon = LIcon<LIconOptions>;
export type DisplayIcon = ImgIcon | LDivIcon;

export interface IconData extends TokenType<"icon"> {
  props: IconProps;
  icon: DisplayIcon;
}

export type ForceNever<T, K extends keyof T> = Omit<T, K> & Record<K, never>;

export type ImgIconOptions = SwitchClassName<LIconOptions> & {
  children?: never;
};
export type DivIconOptions = ForceNever<
  SwitchClassName<LDivIconOptions>,
  "iconRetinaUrl" | "iconUrl" | "html"
>;
export type DivIconProps = FlowProps<DivIconOptions>;

export type IconProps = DivIconProps | ImgIconOptions;
export const Icon = createToken<IconProps, IconData>(
  layerTokenizer as JSXTokenizer<IconData>,
  (props: IconProps) => {
    const icon = props.children
      ? createDivIcon(props)
      : createImageIcon(props as ImgIconOptions);

    onCleanup(icon.remove);

    return {
      type: "icon",
      props,
      icon,
    };
  },
  (props) => props.children ?? <img src={props.iconUrl} />
);

function createImageIcon(props: ImgIconOptions): ImgIcon {
  const icon = new LIcon(props);

  createRenderEffect(() => (icon.options = trackDeep(props)));

  return icon;
}
function createDivIcon(props: DivIconProps): LDivIcon {
  const [, opts] = splitProps(props, ["children"]);

  const withHtml = mergeProps(opts, {
    html: (<>{props.children}</>) as HTMLElement,
  });

  const icon = new LDivIcon(withHtml);

  createRenderEffect(() => (icon.options = trackDeep(opts)));

  return icon;
}
