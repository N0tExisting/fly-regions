import { defineConfig, presetTypography } from "unocss";
import transformerAttributeValuesGroup from "unocss-transformer-attribute-values-group";
import transformerCompileClass from "@unocss/transformer-compile-class";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import transformerDirectives from "@unocss/transformer-directives";
import { presetHeroPatterns } from "@julr/unocss-preset-heropatterns";
import { presetScrollbar } from "unocss-preset-scrollbar";
import { presetForms } from "@julr/unocss-preset-forms";
import presetWebFonts from "@unocss/preset-web-fonts";
import presetWind from "@unocss/preset-wind";

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetTypography(),
    presetWebFonts(),
    presetWind({ dark: { light: ".light", dark: "" } }),
    presetScrollbar(),
    presetForms(),
    presetHeroPatterns,
  ],
  transformers: [
    transformerAttributeValuesGroup,
    transformerVariantGroup(),
    transformerCompileClass(),
    transformerDirectives(),
  ],
});
