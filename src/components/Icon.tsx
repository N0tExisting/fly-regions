import type { VoidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import { LIcon } from "../solid-map";

import type { Region } from "../data/region";

import MdiMapMarker from "~icons/mdi/map-marker";
import MdiMapMarkerStar from "~icons/mdi/map-marker-star";

const Icon: VoidComponent<Region> = (loc) => {
  return (
    <LIcon class="bg-transparent">
      <Dynamic
        component={loc.requiresPaidPlan ? MdiMapMarkerStar : MdiMapMarker}
        class="h-10 w-10"
        classList={{
          "text-blue-5": !loc.gatewayAvailable,
          "text-red-5": loc.gatewayAvailable,
        }}
      />
    </LIcon>
  );
};

export default Icon;
