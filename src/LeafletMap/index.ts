import { lazy } from "solid-js";

export const LMap = lazy(() => import("./map").then((mod) => {default: mod.SolidLeafletMap}))