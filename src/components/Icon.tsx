import type { VoidComponent } from "solid-js";
import type { Region, PropsWithRegion } from "../data/region";
import MdiMapMarker from "~icons/mdi/map-marker";
import MdiMapMarkerStar from "~icons/mdi/map-marker-star";

const Magic = (l: Region) => {
  return l.requiresPaidPlan ? MdiMapMarkerStar : MdiMapMarker;
};

const Icon: VoidComponent<PropsWithRegion> = (p) => {
  // For some reason this also breaks with `Dynamic`
  const Marker = Magic(p.loc);
  return (
    <Marker
      class="h-10 w-10"
      classList={{
        "text-blue-5": !p.loc.gatewayAvailable,
        "text-red-5": p.loc.gatewayAvailable,
      }}
    />
  );
};

export default Icon;
