/**
 * <filo-stack> — Composite Component
 *
 * A flexible layout primitive for arranging children in a row or column
 * with consistent spacing from your design tokens.
 *
 * Usage:
 *   <!-- Vertical stack (default) -->
 *   <filo-stack>
 *     <filo-card>...</filo-card>
 *     <filo-card>...</filo-card>
 *   </filo-stack>
 *
 *   <!-- Horizontal row with large gap, centred -->
 *   <filo-stack direction="row" gap="6" align="center">
 *     <filo-button>Save</filo-button>
 *     <filo-button variant="ghost">Cancel</filo-button>
 *   </filo-stack>
 *
 *   <!-- Wrap row -->
 *   <filo-stack direction="row" wrap gap="4">
 *     <div>Item 1</div>
 *     <div>Item 2</div>
 *     <div>Item 3</div>
 *   </filo-stack>
 *
 * Props:
 *   direction — "row" | "column"                          (default: "column")
 *   gap       — spacing scale key: "1"–"12"               (default: "4")
 *   align     — "start" | "center" | "end" | "stretch"    (default: "start")
 *   justify   — "start" | "center" | "end" | "between"    (default: "start")
 *   wrap      — boolean, enables flex-wrap                 (default: false)
 */

import { Elena } from "@elenajs/core";

export default class FiloStack extends Elena(HTMLElement) {
  static tagName = "filo-stack";
  static props = ["direction", "gap", "align", "justify", "wrap"];

  direction = "column";
  gap       = "4";
  align     = "start";
  justify   = "start";
  wrap      = false;
}

FiloStack.define();
