//import { createSignal } from "solid-js";
import { SolidLeafletMap } from "solidjs-leaflet";
import data from "../data/fly-regions.json";
import MdiMapMarker from "~icons/mdi/map-marker";
import MdiMapMarkerStar from "~icons/mdi/map-marker-star";
import {
  type Component,
  type VoidComponent,
  getOwner,
  runWithOwner,
} from "solid-js";
import { Dynamic } from "solid-js/web";

type Location = (typeof data)[number];

interface PropsWithLocation {
  loc: Location;
}
const Popup: Component<PropsWithLocation> = (p) => {
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

const Icon: VoidComponent<PropsWithLocation> = (p) => {
  return (
    <Dynamic
      component={p.loc.requiresPaidPlan ? MdiMapMarkerStar : MdiMapMarker}
      class="h-10 w-10"
      classList={{
        "text-blue-5": !p.loc.gatewayAvailable,
        "text-red-5": p.loc.gatewayAvailable,
      }}
    />
  );
};

function App() {
  const o = getOwner();
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
        data.forEach((loc) => {
          const marker = l.marker([loc.latitude, loc.longitude], {
            title: loc.code,
            attribution: loc.code,
            icon: new l.DivIcon({
              html: runWithOwner(o, () => <Icon loc={loc} />) as HTMLElement,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
              className: "bg-transparent",
            }),
          });
          marker.addTo(m);
          marker.bindPopup(
            (_lay) => runWithOwner(o, () => <Popup loc={loc} />) as HTMLElement
          );
        });
        /*
        const marker = l
          .marker([63.0, 13.0], {
            icon,
          })
          .addTo(m);
        marker.bindPopup("Hello World!");
        */
      }}
    />
  );
}

export default App;
