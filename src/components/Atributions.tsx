import { LAttribution } from "../solid-map";
import { LeafletAttribution, OSMAttribution } from "../solid-map/attributions";

export const FlyAttribution = () => (
  <a href="https://fly.io/" rel="noopener noreferrer" target="_blank">
    Fly.io
  </a>
);

export const GitAttribution = () => (
  <a
    href="https://github.com/N0tExisting/fly-regions"
    rel="noopener noreferrer"
    target="_blank"
  >
    Source
  </a>
);

export const Spacer = () => <span> | </span>;

export const Attributions = () => {
  return (
    <LAttribution>
      <LeafletAttribution />
      <Spacer />
      <OSMAttribution />
      <Spacer />
      <FlyAttribution />
      <Spacer />
      <GitAttribution />
    </LAttribution>
  );
};

export default Attributions;
