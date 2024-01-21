import type { Component } from "solid-js";
import type { PropsWithRegion } from "../data/region";

const Popup: Component<PropsWithRegion> = (p) => {
  return (
    <section class="text-left">
      <h3 class="mb-1">{p.loc.name}</h3>
      <ul class="list-none pl-0 mt-0">
        <li>Premium: {p.loc.requiresPaidPlan.toString()}</li>
        <li>Gateway: {p.loc.gatewayAvailable.toString()}</li>
      </ul>
    </section>
  );
};

export default Popup;
