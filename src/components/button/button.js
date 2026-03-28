/**
 * <my-button> — Primitive Component
 *
 * A self-contained button that renders its own HTML.
 * Equivalent to a leaf/atom in React terms.
 *
 * Usage:
 *   <my-button>Click me</my-button>
 *   <my-button variant="danger" size="sm">Delete</my-button>
 *   <my-button variant="ghost">Cancel</my-button>
 *   <my-button loading>Saving...</my-button>
 *   <my-button disabled>Unavailable</my-button>
 *
 * Props (also settable as HTML attributes):
 *   variant  — "primary" | "secondary" | "ghost" | "danger"  (default: "primary")
 *   size     — "sm" | "md" | "lg"                            (default: "md")
 *   disabled — boolean                                       (default: false)
 *   loading  — boolean                                       (default: false)
 *
 * Events:
 *   Fires the native "click" event. The component suppresses clicks
 *   when disabled or loading, so you don't need to guard for that.
 */

import { Elena, html } from "@elenajs/core";

export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";

  // Declare all reactive props — Elena will sync these with HTML attributes
  static props = ["variant", "size", "disabled", "loading"];

  // Default values
  variant  = "primary";
  size     = "md";
  disabled = false;
  loading  = false;

  connectedCallback() {
    super.connectedCallback?.();

    // Suppress native clicks when disabled or loading
    this.addEventListener("click", this.#handleClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this.removeEventListener("click", this.#handleClick);
  }

  #handleClick = (event) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  render() {
    const classes = [
      "btn",
      `btn--${this.variant}`,
      `btn--${this.size}`,
      this.loading  ? "btn--loading"  : "",
      this.disabled ? "btn--disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <button
        class="${classes}"
        ?disabled="${this.disabled || this.loading}"
        aria-busy="${this.loading ? "true" : "false"}"
      >
        ${this.loading
          ? html`<span class="btn__spinner" aria-hidden="true"></span>`
          : ""}
        <slot></slot>
      </button>
    `;
  }
}

MyButton.define();
