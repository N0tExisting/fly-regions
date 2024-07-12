import { mergeProps, splitProps } from "solid-js";

export type SwitchClassName<T extends { className?: string }> = Omit<
  T,
  "className"
> & { class?: T["className"] };

export function switchClassName<T extends { className?: string }>(
  opts: SwitchClassName<T>
): T {
  const [className, bOpts] = splitProps(opts, ["class"]);
  return mergeProps(bOpts, {
    get className() {
      return className.class;
    },
  }) as T;
}
