/**
 * Style Dictionary config for transforming Tokens Studio JSON → CSS custom properties.
 *
 * Reads $themes.json to build one CSS file per theme:
 *   dist/tokens/light.css    → semantic color tokens
 *   dist/tokens/desktop.css  → desktop typography tokens
 *   dist/tokens/mobile.css   → mobile typography tokens
 *
 * "source" sets in Tokens Studio → included for reference resolution only (not output)
 * "enabled" sets in Tokens Studio → output as CSS custom properties
 *
 * Run: node scripts/build-tokens.mjs
 */

import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";
import { readFileSync } from "fs";

register(StyleDictionary);

// Custom transform group: same as tokens-studio but with kebab-case names
StyleDictionary.registerTransformGroup({
  name: "tokens-studio-css",
  transforms: [
    "ts/descriptionToComment",
    "ts/size/px",
    "ts/opacity",
    "ts/size/lineheight",
    "ts/typography/fontWeight",
    "ts/resolveMath",
    "ts/size/css/letterspacing",
    "ts/color/css/hexrgba",
    "ts/color/modifiers",
    "name/kebab",
  ],
});

const $themes = JSON.parse(readFileSync("tokens/$themes.json", "utf-8"));

for (const theme of $themes) {
  // "source" sets → Style Dictionary include (available for reference, not output)
  const includePaths = Object.entries(theme.selectedTokenSets)
    .filter(([, status]) => status === "source")
    .map(([name]) => `tokens/${name}.json`);

  // "enabled" sets → Style Dictionary source (will be output)
  const sourcePaths = Object.entries(theme.selectedTokenSets)
    .filter(([, status]) => status === "enabled")
    .map(([name]) => `tokens/${name}.json`);

  const sd = new StyleDictionary({
    include: includePaths,
    source: sourcePaths,
    preprocessors: ["tokens-studio"],
    platforms: {
      css: {
        transformGroup: "tokens-studio-css",
        prefix: "filo",
        buildPath: "dist/tokens/",
        files: [
          {
            destination: `${theme.name.toLowerCase().replace(/\s+/g, "-")}.css`,
            format: "css/variables",
            options: {
              // Resolve all references inline so each file is self-contained
              outputReferences: false,
            },
          },
        ],
      },
    },
  });

  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
}

console.log("✅ Tokens built successfully → dist/tokens/");
