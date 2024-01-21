import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import Icons from "unplugin-icons/vite";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths({ loose: true }),
    Icons({ compiler: "solid" }),
    UnoCSS({ mode: "global" }),
    solid(),
  ],
});
