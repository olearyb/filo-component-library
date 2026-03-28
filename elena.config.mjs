/**
 * ░█ [ELENA]: Bundler configuration
 * @type {import("@elenajs/bundler").ElenaConfig}
 */
export default {
  // Source directory scanned for .js and .css files
  input: "src",

  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
  },

  // Single-file bundle entry point
  bundle: "src/index.js",

  // Banner prepended to bundle output
  banner: `/** @license MIT - my-component-library */`,
};
