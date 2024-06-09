import { type Component, createMemo, Show } from "solid-js";
import type { PropsWithRegion } from "../data/region";

const Popup: Component<PropsWithRegion> = (p) => {
  const locationName = createMemo(() =>
    p.loc.name.split(",").map((s) => s.trim())
  );
  const city = createMemo(() => locationName()[0]);
  const country = createMemo(() => locationName()[1]);
  const isCityState = createMemo(() => city() === country());
  return (
    <section class="text-left p-2 pt-1">
      <h3 class="text-lg leading-none">
        {city()}
        <Show when={!isCityState()}>
          ,
          <br />
          {country()}
        </Show>
      </h3>
      <p class="font-mono italic font-100 text-xs py-1">{p.loc.code}</p>
      <ul class="list-none text-sm">
        <li>Premium: {p.loc.requiresPaidPlan.toString()}</li>
        <li>Gateway: {p.loc.gatewayAvailable.toString()}</li>
      </ul>
    </section>
  );
};

export default Popup;
