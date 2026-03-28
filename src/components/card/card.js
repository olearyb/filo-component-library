/**
 * <my-card> — Composite Component
 *
 * A layout wrapper that enhances whatever HTML is placed inside it.
 * No render() method — it never touches its children. The consumer
 * provides all the inner markup using named slots.
 *
 * Usage:
 *   <my-card>
 *     <img slot="media" src="..." alt="..." />
 *     <h3 slot="title">Card Title</h3>
 *     <p slot="body">Some description text.</p>
 *     <my-button slot="actions">Learn more</my-button>
 *   </my-card>
 *
 *   <!-- Elevated variant with no media -->
 *   <my-card variant="elevated" padding="lg">
 *     <h3 slot="title">Statistics</h3>
 *     <p slot="body">All your numbers here.</p>
 *   </my-card>
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

export default class MyCard extends Elena(HTMLElement) {
  static tagName = "my-card";
  static props = ["variant", "padding"];

  variant = "default";
  padding = "md";

  // No render() method — this is a Composite Component.
  // Elena applies the attribute changes reactively so CSS can respond.
}

MyCard.define();
