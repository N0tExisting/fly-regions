import { type Component, createMemo, Show } from "solid-js";
import type { Region } from "../data/region";
import { LTooltip } from "../solid-map";

const Popup: Component<Region> = (loc) => {
  const locationName = createMemo(() =>
    loc.name.split(",").map((s) => s.trim())
  );
  const city = createMemo(() => locationName()[0]);
  const country = createMemo(() => locationName()[1]);
  const isCityState = createMemo(() => city() === country());
  return (
    <LTooltip class="text-left p-2 pt-1">
      <h3 class="text-lg leading-none">
        {city()}
        <Show when={!isCityState()}>
          ,
          <br />
          {country()}
        </Show>
      </h3>
      <p class="font-mono italic font-100 text-xs py-1">{loc.code}</p>
      <ul class="list-none text-sm">
        <li>Premium: {loc.requiresPaidPlan.toString()}</li>
        <li>Gateway: {loc.gatewayAvailable.toString()}</li>
      </ul>
    </LTooltip>
  );
};

export default Popup;
