/**
 * my-component-library
 *
 * Main entry point — re-exports all components.
 * Consumers can import the whole library:
 *   import "my-component-library"
 *
 * Or import individual components:
 *   import "my-component-library/components/button"
 */

export { default as MyButton } from "./components/button/button.js";
export { default as MyCard }   from "./components/card/card.js";
export { default as MyStack }  from "./components/stack/stack.js";
