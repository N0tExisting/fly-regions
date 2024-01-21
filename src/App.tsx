import { getOwner } from "solid-js";
import { SolidLeafletMap } from "solidjs-leaflet";
import Marker from "./components/Marker";
import data from "./data/fly-regions.json";

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
