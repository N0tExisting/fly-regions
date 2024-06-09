import { type Component } from "solid-js";
import type { PropsWithRegion } from "../data/region";
import { LMarker } from "../solid-map";

import Popup from "./Popup";
import Icon from "./Icon";

export const Marker: Component<PropsWithRegion> = (props) => {
  return (
    <LMarker pos={[props.loc.latitude, props.loc.longitude] as const}>
      <Icon loc={props.loc} />
      <Popup loc={props.loc} />
    </LMarker>
  );
};

export default Marker;
