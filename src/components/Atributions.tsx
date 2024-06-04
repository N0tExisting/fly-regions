import { type Owner, runWithOwner, onCleanup } from "solid-js";
import { render } from "solid-js/web";
import type { Control } from "leaflet";

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

const Spacer = () => <span> | </span>;

export const Attrbutions = () => {
  return (
    <>
      <Spacer />
      <FlyAttribution />
      <Spacer />
      <GitAttribution />
    </>
  );
};

export default function renderAttributons(
  o: Owner | null,
  attrbutions: Control.Attribution
) {
  return runWithOwner(o, () => {
    let unmout = render(
      () => runWithOwner(o, Attrbutions),
      attrbutions.getContainer()!
    );
    return onCleanup(() => {
      unmout();
      unmout = () => {};
    });
  });
}
