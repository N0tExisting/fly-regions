export const OSMAttrUrl = new URL("https://openstreetmap.org/copyright");

export const OSMAttr = () => (
  <a href={OSMAttrUrl.href} rel="noopener noreferrer" target="_blank">
    Map Tiles OpenStreetMap&copy;
  </a>
);