import { SolidLeafletMap } from "solidjs-leaflet";
import data from "./data/fly-regions.json";
import type { Region, PropsWithRegion } from "./data/region";
import MdiMapMarker from "~icons/mdi/map-marker";
import MdiMapMarkerStar from "~icons/mdi/map-marker-star";
import {
  type Component,
  type VoidComponent,
  //type ComponentProps,
  type Owner,
  getOwner,
  runWithOwner,
} from "solid-js";

const Popup: Component<PropsWithRegion> = (p) => {
  return (
    <section class="text-left">
      <h3 class="mb-1">{p.loc.name}</h3>
      <ul class="list-none pl-0 mt-0">
        <li>Premium: {p.loc.requiresPaidPlan.toString()}</li>
        <li>Gateway: {p.loc.gatewayAvailable.toString()}</li>
      </ul>
    </section>
  );
};

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

function Marker(o: Owner | null, l: typeof import("leaflet"), loc: Region) {
  //console.log(Icon.bind(null, { loc }));
  const marker = l.marker([loc.latitude, loc.longitude], {
    title: loc.code,
    //attribution: loc.code,
    icon: new l.DivIcon({
      html: runWithOwner(o, Icon.bind(null, { loc })) as HTMLElement,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      className: "bg-transparent",
    }),
  });
  marker.bindTooltip(
    // @ts-expect-error
    (_lay) => runWithOwner(o, () => <Popup loc={loc} />)() as HTMLElement
  );
  /*marker.bindPopup(
    (_lay) => runWithOwner(o, () => <Popup loc={loc} />)() as HTMLElement
  );*/
  return marker;
}
function App() {
  const o = getOwner();
  const getMarker = Marker.bind(null, o);
  return (
    <SolidLeafletMap
      center={[27.5, 12.5]}
      id="map"
      // @ts-expect-error
      height="100vh"
      // @ts-expect-error
      width="100vw"
      zoom={3}
      onMapReady={(l, m) => {
        const marker = getMarker.bind(null, l);
        data.forEach((loc) => {
          marker(loc).addTo(m);
        });
      }}
    />
  );
}

export default App;
