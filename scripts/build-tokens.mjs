/**
 * Style Dictionary config for transforming Tokens Studio JSON → CSS custom properties.
 *
 * Run: node scripts/build-tokens.mjs
 *
 * The output dist/tokens/tokens.css is what consumers load globally.
 * All components reference these variables — nothing is hardcoded.
 */

import StyleDictionary from "style-dictionary";
import { register, permutateThemes } from "@tokens-studio/sd-transforms";

// Register Tokens Studio transforms with Style Dictionary
register(StyleDictionary);

const sd = new StyleDictionary({
  // Point at your Tokens Studio JSON exports
  source: ["tokens/**/*.json"],

  preprocessors: ["tokens-studio"],

  platforms: {
    css: {
      transformGroup: "tokens-studio",
      prefix: "mcl", // Change "mcl" to your own library prefix
      buildPath: "dist/tokens/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: {
            // Outputs: :root { --mcl-color-primary: ...; }
            outputReferences: true,
          },
        },
      ],
    },

    // Optional: also emit a JS module so components can import token values
    js: {
      transformGroup: "tokens-studio",
      buildPath: "dist/tokens/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/esm",
        },
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();

console.log("✅ Tokens built successfully → dist/tokens/");
