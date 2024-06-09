import { Show, splitProps } from "solid-js";
import { AttributionProps } from ".";

export const LeafletAttrURL = new URL("https://leafletjs.com");

export const UaFlag = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="8"
    viewBox="0 0 12 8"
    class="leaflet-attribution-flag"
  >
    <path fill="#4C7BE1" d="M0 0h12v4H0z" />
    <path fill="#FFD500" d="M0 4h12v3H0z" />
    <path fill="#E0BC00" d="M0 7h12v1H0z" />
  </svg>
);

export type LeafletAttrProps = AttributionProps & {
  uaFlag?: boolean;
};

export const LeafletAttr = (props: LeafletAttrProps) => {
  const [, aProps] = splitProps(props, ["uaFlag"]);
  return (
    <a
      href={LeafletAttrURL.href}
      title="A JavaScript library for interactive maps"
      rel="noopener noreferrer"
      target="_blank"
      {...aProps}
    >
      <Show when={props.uaFlag}>
        <UaFlag />
      </Show>
      Leaflet
    </a>
  );
};
