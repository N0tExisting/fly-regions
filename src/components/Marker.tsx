import { type Component } from "solid-js";
import type { Region } from "../data/region";
import { LMarker } from "../solid-map";

import Popup from "./Popup";
import Icon from "./Icon";

export const Marker: Component<Region> = (loc) => {
  return (
    <LMarker pos={[loc.latitude, loc.longitude] as const}>
      <Icon {...loc} />
      <Popup {...loc} />
    </LMarker>
  );
};

export default Marker;
