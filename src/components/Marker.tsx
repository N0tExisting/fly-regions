import { type Owner, runWithOwner } from "solid-js";

import type { Region } from "../data/region";

import Popup from "./Popup";
import Icon from "./Icon";

export type Leaflet = typeof import("leaflet");
export default function Marker(o: Owner | null, l: Leaflet, loc: Region) {
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
    (_layer) => runWithOwner(o, Popup.bind(null, { loc })) as HTMLElement
  );
  /*marker.bindPopup(
    (_layer) => runWithOwner(o, () => <Popup loc={loc} />)() as HTMLElement
  );*/
  return marker;
}
