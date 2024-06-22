import { FlowComponent, Suspense } from "solid-js";

export const Fallback = () => {
  return (
    <div class="size-full flex flex-items-center justify-center content-center">
      <h1 class="text-center text-7xl text-700">Loading Map</h1>
    </div>
  );
};

export const Loader: FlowComponent = (props) => {
  return <Suspense fallback={<Fallback />}>{props.children}</Suspense>;
};

export default Loader;
