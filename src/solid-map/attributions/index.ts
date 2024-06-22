import type { ComponentProps } from "solid-js";

export type AttributionProps = Omit<ComponentProps<"a">, "href" | "children">;

export * from "./leaflet";
export * from "./osm";
