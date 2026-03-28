/**
 * <filo-card> — Composite Component
 *
 * A layout wrapper that enhances whatever HTML is placed inside it.
 * No render() method — it never touches its children. The consumer
 * provides all the inner markup using named slots.
 *
 * Usage:
 *   <filo-card>
 *     <img slot="media" src="..." alt="..." />
 *     <h3 slot="title">Card Title</h3>
 *     <p slot="body">Some description text.</p>
 *     <filo-button slot="actions">Learn more</filo-button>
 *   </filo-card>
 *
 *   <!-- Elevated variant with no media -->
 *   <filo-card variant="elevated" padding="lg">
 *     <h3 slot="title">Statistics</h3>
 *     <p slot="body">All your numbers here.</p>
 *   </filo-card>
 *
 * Props:
 *   variant — "default" | "elevated" | "outlined"  (default: "default")
 *   padding — "sm" | "md" | "lg"                   (default: "md")
 *
 * Slots:
 *   media   — optional image or media region at the top
 *   title   — heading area
 *   body    — main content
 *   actions — button/action area at the bottom
 */

import { Elena } from "@elenajs/core";

export default class FiloCard extends Elena(HTMLElement) {
  static tagName = "filo-card";
  static props = ["variant", "padding"];

  variant = "default";
  padding = "md";

  // No render() method — this is a Composite Component.
  // Elena applies the attribute changes reactively so CSS can respond.
}

FiloCard.define();
